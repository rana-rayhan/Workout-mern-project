const router = require("express").Router();
const requireAuth = require("../middlewares/requireAuth");
//
//workout controllers
const {
  allWorkout,
  singleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workout.controllers");
const Workout = require("../models/workout.model");
//
//
// Protected route
router.use(requireAuth);
//
//
//
//get all workout list
router.get("/", allWorkout);
//
//
// get single workout
router.get("/:id", singleWorkout);
//
//
//post workouts route
router.post("/", createWorkout);
//
//
//delete workouts
router.delete("/:id", deleteWorkout);
//
//
//update workout
router.patch("/:id", updateWorkout);
//
//
//
//Exporting app in app.js
module.exports = router;
