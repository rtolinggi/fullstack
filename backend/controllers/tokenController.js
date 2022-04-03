import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken || refreshToken === undefined) {
    return res.status(200).json({ success: false, msg: "Youre Not Login" });
  }
  const user = await Users.findOne({ refresh_token: refreshToken }).exec();
  if (!user) {
    return res.status(200).json({ success: false, msg: "Token Not Valid" });
  } else {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decode) => {
      const accesToken = generateToken(user._id);
      res
        .status(200)
        .json({ success: true, msg: "success", token: accesToken });
    });
  }
};

//Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "20s",
  });
};

//Refresh Token
const resetToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

export { refreshToken, resetToken, generateToken };
