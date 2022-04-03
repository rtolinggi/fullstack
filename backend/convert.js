import connectDB from "./config/db.js";
import fs, { readdir } from "fs/promises";
import path from "path";
import "dotenv/config";
import xlsx from "xlsx";
import color from "colors";
import monitoringNew from "./models/monitoringnewModel.js";
import moment from "moment";

// let tanggal = (tgl) => {
//   const newTgl = moment(tgl, "YYYY-MM-DD").format();
//   return newTgl;
// };
// const tgl = "20/02/2022";
// console.log(tanggal(tgl));
// const coba = moment().format();
// console.log(coba);
// console.log(tanggal(coba));

//baca direktori File dalam folder
// try {
//   const files = await readdir("./backend/storage");
//   for (const file of files) console.log(file);
// } catch (err) {
//   console.error(err);
// }

await connectDB();

const workbook = xlsx.readFile("./backend/storage/611-KD-0-24022022-12.xls");
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);
const newData = data.map((a) => {
  let agreement = a.AgreementNo.split(" ")[0].split("'")[1];
  const tanggal = (tgl) => {
    const newTgl = moment(tgl, "YYYY-MM-DD").format();
    return newTgl;
  };
  console.log(a.DueDate);
  const baru = {
    branch: a.Branch,
    pos: a.Pos,
    collector: a.Collector,
    koordinator: a.Koordinator,
    agreementNo: agreement,
    customerName: a["Customer Name"],
    kecamatan: a.Kecamatan,
    kelurahan: a.Kelurahan,
    tenor: a.Tenor,
    installmentNo: a.InstallmentNo,
    dueDate: a.DueDate,
    instAmt: a["Inst. Amt"],
    osBalance: a.OSBalance,
    ovdAwal: a["OVD Awal"],
    bucketAwal: a.BucketAwal,
    ovdAkhir: a.OVDAkhir,
    bucketAkhir: a.BucketAkhir,
    amtDueAwal: a["AmtDue Awal"],
    minPayment: a["Min Payment"],
    collected: a["Collected "],
    osAkhir: a["OS Akhir "],
    collectedAll: a["Collected All "],
    posisiBucket: a["Posisi Bucket "],
    klasifikasi: a.Klasifikasi,
    problem: a["Problem "],
    detailKronologis: a.DetailKronologis,
    nextPlanDate: tanggal(a.NextPlanDate),
    actionDate: tanggal(a.ActionDate),
    jlhVisit: a.JlhVisit,
    jlhJb: a.JlhJB,
    jlhVisitViaFak: a.JlhVisitViaFAK,
    jlhJbViaFak: a.JlhJBViaFAK,
    assetCode: a.AssetCode,
    noMesin: a["No Mesin"],
    noRangka: a["No Rangka"],
    lastPayDate: tanggal(a.LastPayDate),
    lastPaymentTrans: a.LastPaymentTrans,
    lastPayAmt: a.LastPayAmt,
    isTurunTask: a.IsTurunTask,
    gCModel: a.GCModel,
    riskModel: a.RiskModel,
  };
  return baru;
});

await fs.writeFile("data.json", JSON.stringify(newData), "utf-8");

console.log("Eksport data to Json Succes");

try {
  await monitoringNew.remove();
  await monitoringNew.insertMany(newData);
  console.log("data berhasil di simpan");
} catch (error) {
  console.log(error);
}

// // const data = xlsx.utils.sheet_to_json(worksheet);
// console.log(data);
