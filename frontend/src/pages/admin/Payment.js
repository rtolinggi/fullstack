import React from "react";
import * as XLSX from "xlsx";

const Payment = () => {
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      console.log(d);
    });
  };
  return (
    <div className=' bg-gray-100 mt-12 mx-8 py-8 px-6 rounded-xl'>
      <h1 className='text-2xl text-teal-500 font-medium mb-8'>Payment</h1>
      <input
        type='file'
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
    </div>
  );
};

export default Payment;
