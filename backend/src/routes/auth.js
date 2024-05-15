const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

//? user controller
const { registerUser, loginUser, isUserExist } = require("../controllers/auth");

//! POST /users/register
router.post(
  "/register",
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 4 })
      .withMessage("Please enter a valid name, minimum 4 character long"),
    body("email")
      .trim()
      .isEmail()
      .custom((emailId) => {
        return isUserExist(emailId)
          .then((status) => {
            if (status) {
              return Promise.reject("User already exist!");
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Enter at least 6 character password!"),
    body("confirm password")
      .trim()
      .custom((value, { req }) => {
        if (value != req.body.password) {
          return Promise.reject("Password mismatch!");
        }
        return true;
      }),
  ],
  registerUser
);

//! POST /users/login
router.post("/login", loginUser);

module.exports = router;
