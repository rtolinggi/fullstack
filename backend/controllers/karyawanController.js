import expressAsyncHandler from "express-async-handler";
import { Karyawan } from "../models/index.js";

// @desc    Get Karyawan
//@route    /api/karyawan
//@access   Private
const getKarywan = expressAsyncHandler(async (req, res) => {
  const karyawan = await Karyawan.find({});
  if (karyawan) {
    return res.status(200).json({ success: true, data: karyawan });
  }
  if (karyawan.length === 0) {
    return res
      .status(200)
      .json({ success: true, data: karyawan, msg: "No data" });
  }
  if (!karyawan) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

// @desc    POST karyawan
//@route    /api/karyawan
//@access   Private
const storeKaryawan = expressAsyncHandler(async (req, res) => {
  const { name, nik, position, active, noContact } = req.body;
  if (!name || !nik || !position || !active || !noContact) {
    res.status(401);
    throw new Error("All Field Is Required");
  }

  try {
    const karyawan = await Karyawan.create({
      name,
      nik,
      position,
      active,
      noContact,
    });
    if (karyawan) {
      return res.status(200).json({
        success: true,
        msg: "Success Insert Data Karyawan",
        data: karyawan,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Field text is Required");
  }
});

// @desc    PUT karyawan
//@route    /api/karyawan/:id
//@access   Private
const updateKaryawan = expressAsyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Params Id is Required");
  }

  const karyawan = await Karyawan.findById(req.params.id);

  if (!karyawan) {
    res.status(400);
    throw new Error("Id Not Found");
  }

  const updateKaryawan = await Karyawan.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json({ message: "Data Karyawan is Updated", data: updateKaryawan });
});

// @desc    DELETE karyawan
//@route    /api/karyawan/:id
//@access   Private
const deleteKaryawan = expressAsyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Params Id is Required");
  }

  const karyawan = await Karyawan.findById(req.params.id);

  if (!karyawan) {
    res.status(400);
    throw new Error("Id Not Found");
  }

  await karyawan.remove();
  return res
    .status(200)
    .json({ success: true, msg: `Data id ${req.params.id} has deleted` });
});

export { getKarywan, storeKaryawan, updateKaryawan, deleteKaryawan };
