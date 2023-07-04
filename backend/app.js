const express = require("express");
const cors = require("cors");
const workoutRoute = require("./routes/workout");
const userRouter = require("./routes/user.router");
const app = express();
//
//
//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
//
// middle-ware for checking request method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//
//
// Workouts
app.use("/api/workouts", workoutRoute);
//
//user login & singup routes
app.use("/api/user", userRouter);
//
//
//basic routes
app.get("/", (req, res) => res.status(200).json({ msg: "Home Route" }));
app.use("*", (req, res) => res.status(404).json({ msg: "404 not found" }));
//
//
//
// Exporting app into Index.js
module.exports = app;
