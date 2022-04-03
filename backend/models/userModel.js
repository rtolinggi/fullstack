import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please insert name"],
    },
    email: {
      type: String,
      required: [true, "Please insert email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please insert password"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    refresh_token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);

export default Users;
