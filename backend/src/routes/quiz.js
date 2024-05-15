const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  publishQuiz,
  getAllQuiz,
} = require("../controllers/quiz");
const { isAuthenticate } = require("../middlewares/isAuthenticate");

//create
//POST /quiz/create
router.post(
  "/create",
  isAuthenticate,
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 10 })
      .withMessage("Please enter a valid name, minimum 10 character long"),
    body("quetions_list").custom((questions_list) => {
      if (questions_list.length == 0) {
        return Promise.reject("Enter atleast 1 question!");
      }
      return true;
    }),
    body("answers").custom((answers) => {
      if (Object.keys(answers).length == 0) {
        return Promise.reject("Answer should not be empty!");
      }
      return true;
    }),
  ],
  createQuiz
);

//get
//GET /quiz/:quizId
router.get("/:quizId", isAuthenticate, getQuiz);

//update
//PUT /quiz/update
router.put(
  "/update",
  isAuthenticate,
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 10 })
      .withMessage("Please enter a valid name, minimum 10 character long"),
    body("quetions_list").custom((questions_list) => {
      if (questions_list.length == 0) {
        return Promise.reject("Enter atleast 1 question!");
      }
      return true;
    }),
    body("answers").custom((answers) => {
      if (Object.keys(answers).length == 0) {
        return Promise.reject("Answer should not be empty!");
      }
      return true;
    }),
  ],
  updateQuiz
);

//delete
//DELETE /quiz//delete/:quizId
router.delete("/delete/:quizId", isAuthenticate, deleteQuiz);

//Publish
//PATCH /quiz/publish
router.patch("/publish", isAuthenticate, publishQuiz);

// router.get("/allQuiz",isAuthenticate, getAllQuiz);

module.exports = router;
