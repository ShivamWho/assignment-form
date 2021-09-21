require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB);

const assignmentSchema = {
  name: String,
  email: String,
  rollno: Number,
  url: String,
  pdf: Buffer,
};

const Assignment = mongoose.model("Assignment", assignmentSchema);

app.post("/", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var rollno = req.body.rollno;
  var url = req.body.url;
  var pdf = req.body.pdf;

  const assignment = new Assignment({
    name: name,
    email: email,
    rollno: rollno,
    url: url,
    pdf: pdf,
  });
  assignment.save();
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server up at 3000");
});
