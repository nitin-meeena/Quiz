const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const getResponse = require("./src/utils/response");
require("dotenv").config();
//? userRoute
const userRoute = require("./src/routes/user");
const authRoute = require("./src/routes/auth");
const quizRoute = require("./src/routes/quiz");
const examRoute = require("./src/routes/exam");
const reportRoute = require("./src/routes/report");
// const ProjectError = require("./src/helper/error");

const Port = process.env.port || 4000;
const app = express();
app.use(express.json());
app.use(cors());



//? Redirect  /users to userRoute
app.use("/users", userRoute);

//? Redirect  /auth to authRoute
app.use("/auth", authRoute);

//? Redirect  /quiz to quizRoute
app.use("/quiz", quizRoute);

//? Redirect  /exam to examRoute
app.use("/exam", examRoute);

//? Redirect  /report to reportRoute
app.use("/report", reportRoute);

//? All in one error
app.use((err, req, res, next) => {
  let message = String;
  let statusCode = Number;
  let resp = getResponse();
  if (!!err.statusCode && err.statusCode < 500) {
    message = err.message;
    statusCode = err.statusCode;
  } else {
    message = "Something went wrong please try after sometimes!";
    statusCode = 500;
  }
  resp = { status: "error", message: message, data: {} };
  if (!!err.data) {
    resp.data = err.data;
  }
  console.log(err.statusCode, err.message);
  res.status(statusCode).send(resp);
});

//? MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DataBase has been connected!");
    //! server start
    app.listen(Port, () => console.log(`server is start on ${Port}`));
  })
  .catch((err) => console.log("MongoDB disconnected!", err));
