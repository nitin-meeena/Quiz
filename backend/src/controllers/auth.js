const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const ProjectError = require("../helper/error");
const getResponse = require("../utils/response");
require("dotenv").config();

const registerUser = async (req, res, next) => {
  let resp = getResponse();
  try {
    //validation
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      const err = new ProjectError("Validation Failed!");
      err.statusCode = 422;
      err.data = validationError.array();
      throw err;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = await bcrypt.hash(req.body.password, 12);

    const user = new User({ name, email, password });
    const result = await user.save();
    if (!result) {
      resp = { status: "error", message: "result not found", data: {} };
      res.json(resp);
    } else {
      resp = {
        status: "success",
        message: "Registration Done",
        data: { userID: result._id },
      };
      res.json(resp);
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  let resp = getResponse();
  try {
    const email = req.body.email;
    const password = req.body.password;
    //find user
    const user = await User.findOne({ email });
    if (!user) {
      const err = new ProjectError("No user exist!");
      err.statusCode = 401;
      throw err;
    }
    //verify password
    const status = await bcrypt.compare(password, user.password);
    //then decide
    if (status) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
        expiresIn: "1h",
      });
      resp = {
        status: "success",
        message: "Login",
        data: { token },
      };
      res.status(200).send(resp);
    } else {
      const err = new ProjectError("credentials mismatch");
      err.statusCode = 401;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

const isUserExist = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }
  return true;
};

module.exports = {
  registerUser,
  loginUser,
  isUserExist,
};
