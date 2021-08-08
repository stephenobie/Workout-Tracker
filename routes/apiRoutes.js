const router = require("express").Router();
const Workout = require("./models");

router
  .get("/api/workouts", (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercise.duration",
          },
        },
      },
    ]);
  })
  .then((dbWorkouts) => {
    res.json(dbWorkouts);
  })
  .catch((err) => {
    res.json(err);
  });
