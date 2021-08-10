const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: () => new Date(),
    },
    exercises: [
      {
        type: {
          type: String,
          enum: ["resistance", "cardio"],
          description: "Cardio or Resistance Training Only",
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        distance: Number,
        duration: Number,
        weight: Number,
        sets: Number,
        reps: Number,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
