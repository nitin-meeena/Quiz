const jwt = require("jsonwebtoken");
require("dotenv").config();
const ProjectError = require("../helper/error");

const isAuthenticate = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const err = new ProjectError("Not authenticated!");
      err.statusCode = 401;
      throw err;
    }
    const token = authHeader.split(" ")[1];
    let decodeToken = { userId: String, iat: Number, exp: Number };
    try {
      decodeToken = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (error) {
      const err = new ProjectError("Not authenticated");
      err.statusCode = 401;
      throw err;
    }
    if (!decodeToken) {
      const err = new ProjectError("Not authenticated!");
      err.statusCode = 401;
      throw err;
    }
    req.userId = decodeToken.userId;
    // if in next code you needed user then here, fetch the user from user model via user controller.
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAuthenticate,
};
