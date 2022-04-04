import express from "express";
import { goalRoute, userRoute, karyawanRoute } from "./routes/index.js";
import color from "colors";
import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";

const whiteList = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/users", userRoute);
app.use("/api/goals", goalRoute);
app.use("/api/karyawan", karyawanRoute);

//handling error (middleware)
app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server start on port ${PORT}`.cyan.underline);
});
