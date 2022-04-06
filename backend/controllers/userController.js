import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { Users, Token } from "../models/index.js";
import { generateToken, resetToken } from "./tokenController.js";
import emailConfig from "../email/config.js";
import crypto from "crypto";

// @desc    Register New Users
//@route    /api/users/register
//@access   Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  //validate field not null
  if (!name || !email || !password || !confirmPassword) {
    res.status(401);
    throw new Error("All Field Is Required");
  }
  //validate password and confirm Password
  if (password !== confirmPassword) {
    res.status(401);
    throw new Error("Password and Confirm password not match");
  }
  //check User exists
  const userExist = await Users.findOne({ email });
  if (userExist) {
    res.status(401);
    throw new Error("Email Already Exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create Users
  let user = await Users.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    let token = await Token.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    let url = `${process.env.BASE_URL}api/users/${user._id}/verify/${token.token}`;
    await emailConfig(
      user.email,
      "Verify email",
      `<h3>Please Click Link Bottom to Verify youre Email</h3>
    <p>${url}<p>`
    );
    res.status(200).json({
      success: true,
      msg: "Register Success Please Check Youre Email to Verified",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

// @desc    Authenticate Users
//@route    /api/users
//@access   Public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //ceheck req email n password
  if (!email || !password) {
    res.status(401);
    throw new Error("Email and Password is Required");
  }

  //check email
  const user = await Users.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Email Not Found");
  }

  // check verified email
  const checkLoginEmailVerified = process.env.EMAIL_VERIFIED_LOGIN;
  if (checkLoginEmailVerified == "true") {
    if (!user.verified) {
      res.status(401);
      throw new Error("Email Not Verified");
    }
  }

  if (user && !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid Credential");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    //Update Refresh Token
    const refreshToken = resetToken(user.id);
    await Users.findByIdAndUpdate(
      user.id,
      { refresh_token: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
    });
    res.status(200).json({
      success: true,
      msg: "Login Succes",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

// @desc    Get Data Users
//@route    /api/users/me
//@access   Public
const getMe = expressAsyncHandler(async (req, res) => {
  const { _id, name, email } = await Users.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// @desc    Logout Users
//@route    /api/users/logout
//@access   Public
const Logout = expressAsyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401);
    throw new Error("Youre Not Login");
  }
  const user = await Users.findOne({ refresh_token: refreshToken }).exec();
  if (!user) {
    res.status(401);
    throw new Error("Token Not Valid");
  }
  try {
    await Users.findByIdAndUpdate(
      user.id,
      { refresh_token: "" },
      { new: true }
    );
    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, msg: "Logout Success" });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const userEmail = await Users.findOne({ email: email })
      .select("-password")
      .exec();
    if (!userEmail) {
      res.status(401);
      throw new Error("Email Not Found");
    }
    res.json({ message: "OK" });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

// @desc    Verify Email
//@route    /api/users/:id/verivy/:token
//@access   Public
const verifyEmail = expressAsyncHandler(async (req, res) => {
  try {
    let user = await Users.findOne({ _id: req.params.id });
    if (!user) {
      res.status(401);
      throw new Error("Invalid Link");
    }

    let token = await Token.findOne({ token: req.params.token });
    if (!token) {
      res.status(401);
      throw new Error("Invalid Link");
    }

    await Users.updateOne({ email: user.email }, { verified: true });
    await Token.deleteOne({ _id: token._id });
    res.status(200).json({ message: "Email Verified Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { registerUser, loginUser, getMe, Logout, forgotPassword, verifyEmail };
