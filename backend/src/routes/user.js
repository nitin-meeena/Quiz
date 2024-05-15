const express = require("express");
const router = express.Router();
//? user controller
const { updateUser, getUser, getUsers } = require("../controllers/user");
const { isAuthenticate } = require("../middlewares/isAuthenticate");

//! GET /users/:userID
router.get("/:userId", isAuthenticate, getUser);

//! GET /users/
router.get("/", getUsers);

//! PUT /users/updateUser
router.put("/updateUser",isAuthenticate ,updateUser);

module.exports = router;
