import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ success: false, msg: "Not Authorization" });
  }
  const user = await Users.findOne({ refresh_token: refreshToken }).exec();
  if (!user) {
    return res.status(401).json({ success: false, msg: "Token Not Valid" });
  } else {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decode) => {
      const accesToken = accessToken(user._id);
      res.status(200).json({ success: true, token: accesToken });
    });
  }
};

//Generate access Token
const accessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "60s",
  });
};

//Generate Refresh Token
const resetToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

export { refreshToken, resetToken, accessToken };
