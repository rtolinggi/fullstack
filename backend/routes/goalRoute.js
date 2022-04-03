import express from "express";
import {
  getGoals,
  storeGoals,
  updateGoals,
  deleteGoals,
} from "../controllers/goalController.js";
import protect from "../middleware/authMiddleware.js";

const goalRoute = express.Router();

goalRoute.route("/").get(protect, getGoals).post(protect, storeGoals);
goalRoute.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

export default goalRoute;
