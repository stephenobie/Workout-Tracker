const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static("public"));
mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.use("./routes/apiRoutes.js");
app.use("./routes/htmlRoutes.js");

app.listen(PORT, () => {
  console.log(`App is running on PORT http://localhost:${PORT}`);
});
