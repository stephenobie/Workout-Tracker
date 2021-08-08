const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;
const db = require("./models");

const app = express();
app.use(logger("dev"));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(express.static("public"));
mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

db.workout
  .create({ name: "Workout Tracker" })
  .then((dbworkout) => {
    console.log(dbworkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });
//need to work on post//
app.post("/exercise", ({ body }, res) => {
  db.exercise
    .create(body)
    .then(({ _id }) =>
      db.workout.findOneAndUpdate({}, { $push: { stats: _id } }, { new: true })
    )
    .then((dbworkout) => {
      res.json(dbworkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/exercise", (req, res) => {
  db.Exercise.find({})
    .then((dbBook) => {
      res.json(dbBook);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/library", (req, res) => {
  db.Library.find({})
    .then((dbLibrary) => {
      res.json(dbLibrary);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/populated", (req, res) => {
  db.Library.find({})
    .populate("books")
    .then((dbLibrary) => {
      res.json(dbLibrary);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.use("./routes/apiRoutes.js");
app.use("./routes/htmlRoutes.js");

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
