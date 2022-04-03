import express from "express";
import {
  getKarywan,
  storeKaryawan,
  deleteKaryawan,
  updateKaryawan,
} from "../controllers/karyawanController.js";
import protect from "../middleware/authMiddleware.js";

const karyawanRoute = express.Router();

karyawanRoute.route("/").get(protect, getKarywan).post(protect, storeKaryawan);
karyawanRoute
  .route("/:id")
  .put(protect, updateKaryawan)
  .delete(protect, deleteKaryawan);

export default karyawanRoute;
