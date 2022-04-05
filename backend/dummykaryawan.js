import Karyawan from "./models/karyawanModel.js";
import dataKaryawan from "./storage/dummy-karyawan.js";
import connectDB from "./config/db.js";
import color from "colors";
import "dotenv/config";

await connectDB();

const result = await Karyawan.insertMany(dataKaryawan, (err, docs) => {
  console.log(err);
  console.log(docs);
});

console.log(result);
