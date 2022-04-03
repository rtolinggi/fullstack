import express from "express";
import {
  getMe,
  loginUser,
  registerUser,
  Logout,
  forgotPassword,
  verifyEmail,
} from "../controllers/userController.js";
import { refreshToken } from "../controllers/tokenController.js";
import protect from "../middleware/authMiddleware.js";
const userRoute = express.Router();

userRoute.post("/login", loginUser);
userRoute.post("/register", registerUser);
userRoute.get("/me", protect, getMe);
userRoute.get("/token", refreshToken);
userRoute.put("/forgotpassword", forgotPassword);
userRoute.get("/:id/verify/:token", verifyEmail);
userRoute.delete("/logout", Logout);

export default userRoute;
