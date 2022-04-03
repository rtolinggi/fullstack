import expressAsyncHandler from "express-async-handler";
import { Goal, Users } from "../models/index.js";

// @desc    Get Goals
//@route    /api/goals
//@access   Private
const getGoals = expressAsyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  if (!goals) {
    res.status(400);
    throw new Error("User Not Authorization");
  }
  res.status(200).json({ message: goals });
});

// @desc    POST Goals
//@route    /api/goals
//@access   Private
const storeGoals = expressAsyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Field text is Required");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  return res.status(200).json({
    message: "Test Post Goals",
    data: goal,
  });
});

// @desc    PUT Goals
//@route    /api/goals/:id
//@access   Private
const updateGoals = expressAsyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Id Not Found");
  }

  //Ceheck User
  const user = await Users.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //Make sure logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorization");
  }
  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res
    .status(200)
    .json({ message: "Data Goal Updated", data: updateGoal });
});

// @desc    DELETE Goals
//@route    /api/goals/:id
//@access   Private
const deleteGoals = expressAsyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Id not Found");
  }

  //Ceheck User
  const user = await Users.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  //Make sure logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorization");
  }

  await goal.remove();
  return res
    .status(200)
    .json({ message: `Data id ${req.params.id} has deleted` });
});

export { getGoals, storeGoals, updateGoals, deleteGoals };
