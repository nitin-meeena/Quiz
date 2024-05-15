const User = require("../models/userModel");
const ProjectError = require("../helper/error");
const getResponse = require("../utils/response");


const getUser = async (req, res, next) => {
  let resp = getResponse();
  console.log(req.userId);
  try {
    const userId = req.params.userId;
    if (req.userId != req.params.userId) {
      const err = new ProjectError("You are not authorize");
      err.statusCode = 401;
      err.data = { hi: "hi there is an error" };
      throw err;
    }
    const user = await User.findById(userId, { name: 1, email: 1 });
    if (!user) {
      const err = new ProjectError("No User found!");
      err.statusCode = 401;
      throw err;
    } else {
      resp = {
        status: "success",
        message: "User Found",
        data: { user: user },
      };
      res.status(200).send(resp);
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  let resp = getResponse();
  try {
    if (req.userId != req.body._id) {
      const err = new ProjectError("You are not authorize");
      err.statusCode = 401;
      throw err;
    }
    const userId = req.body._id;
    const user = await User.findById(userId);
    if (!user) {
      const err = new ProjectError("No User Exist!");
      err.statusCode = 401;
      throw err;
    }
    user.name = req.body.name;
    user.save();
    resp = {
      status: "success",
      message: "User Updated",
      data: {},
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

// const deleteUser = async (req, res, next) => {
//   console.log("Delete the current user");
//   console.log(req.body);
//   res.json("Delete the current user");
// };

const getUsers = async (req, res, next) => {
  let resp = getResponse();

  try {
    const users = await User.find();
    if (!users) {
      const err = new ProjectError("No User found!");
      err.statusCode = 401;
      throw err;
    } else {
      resp = {
        status: "success",
        message: "User Found",
        data: { user: users },
      };
      res.send(resp);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
  getUser,
  getUsers,
};
