const Workout = require("../models/workout.model");
const mongoose = require("mongoose");
//
//
//
// Gett all workout
const allWorkout = async (req, res) => {
  const user_id = req.authUser._id;
  const workout = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workout);
};
//
//
//
//get a single workout
const singleWorkout = async (req, res) => {
  const id = req.params.id;
  try {
    //checking mongoose id isVaild
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }
    //serching single workout by id
    const isSingleWorkout = await Workout.findById(id);
    res.status(200).json(isSingleWorkout);
  } catch (error) {
    res.status(500).json({ error: error.message, data: "Server error" });
  }
};
//
//
//
//create workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  //add doc to db
  try {
    const user_id = req.authUser._id;
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//
//
//
//delete workout
const deleteWorkout = async (req, res) => {
  const id = req.params.id;
  try {
    //checking mongoose id isVaild
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout v1" });
    }
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({ error: "No such workout v2" });
    }
    res.status(202).json({ Data: "Success", deleted_file: workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//
//
//
//update workout
const updateWorkout = async (req, res) => {
  const id = req.params.id;
  try {
    //checking mongoose id isVaild
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout v1" });
    }
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!workout) {
      return res.status(404).json({ error: "No such workout v2" });
    }
    res.status(202).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  allWorkout,
  singleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
