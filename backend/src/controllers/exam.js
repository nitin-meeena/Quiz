const Quiz = require("../models/quizModel");
const Result = require("../models/reportModel");
const ProjectError = require("../helper/error");
const getResponse = require("../utils/response")


const startExam = async (req, res, next) => {
  let resp = getResponse();
  try {
    const quiz = await Quiz.findById(req.params.quizId, {
      name: 1,
      quetions_list: 1,
      is_publish: 1,
    });
    if (!quiz) {
      const err = new ProjectError("No quiz found!");
      err.statusCode = 404;
      throw err;
    }
    if (!quiz.is_publish) {
      const err = new ProjectError("Quiz is not published!");
      err.statusCode = 405;
      throw err;
    }
    resp = { status: "success", message: "Quiz", data: quiz };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};
const submitExam = async (req, res, next) => {
  let resp = getResponse();
  try {
    const quizId = req.body.quizId;
    const attempted_question = req.body.attempted_question;

    const quiz = await Quiz.findById(quizId, { answers: 1 });
    const answers = quiz.answers;
    //result
    const userId = req.userId;
    const allQuestion = Object.keys(answers);
    const total = allQuestion.length;
    let score = 0;

    for (let i = 0; i < total; i++) {
      let quetions_number = allQuestion[i];
      if (
        !!attempted_question[quetions_number] &&
        answers[quetions_number] == attempted_question[quetions_number]
      ) {
        score = score + 1;
      }
    }
    const result = new Result({ userId, quizId, score, total });
    const data = await result.save();
    resp = {
      status: "success",
      message: "Quiz submitted",
      data: { total: total, score: score, resultId: data._id },
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  startExam,
  submitExam,
};
