import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { Users } from "../models/index.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  const reqHeader = req.headers.authorization;
  if (reqHeader && reqHeader.startsWith("Bearer")) {
    try {
      //Get Token From Header
      token = reqHeader.split(" ")[1];
      //Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Get User From the Token
      req.user = await Users.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorization");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorization and No Token");
  }
});

export default protect;
