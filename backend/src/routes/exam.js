const express = require("express");
const router = express.Router();
const { startExam, submitExam } = require("../controllers/exam");
const { isAuthenticate } = require("../middlewares/isAuthenticate");

//GET   /exam/quizId
router.get("/:quizId",isAuthenticate, startExam);

//POST   /exam
router.post("/",isAuthenticate, submitExam);

module.exports = router;
