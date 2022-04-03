import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please insert name"],
    },
    nik: {
      type: Number,
      required: [true, "Please insert Nik"],
    },
    position: {
      type: String,
      required: [true, "Please insert position"],
    },
    active: {
      type: Boolean,
      default: false,
    },
    noContact: {
      type: String,
      required: [true, "Please insert No Contact"],
    },
  },
  {
    timestamps: true,
  }
);

const Karyawan = mongoose.model("Karyawan", userSchema);

export default Karyawan;
