const { validationResult } = require("express-validator");
const Quiz = require("../models/quizModel");
const ProjectError = require("../helper/error");
const getResponse = require("../utils/response")


const createQuiz = async (req, res, next) => {
  let resp = getResponse();
  try {
    // validation
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      const err = new ProjectError("Validation Failed!");
      err.statusCode = 422;
      err.data = validationError.array();
      throw err;
    }

    const name = req.body.name;
    const quetions_list = req.body.quetions_list;
    const answers = req.body.answers;
    const created_by = req.userId;

    const quiz = new Quiz({ name, quetions_list, answers, created_by });
    const result = await quiz.save();

    resp = {
      status: "success",
      message: "Quiz created successfully",
      data: { quizId: result._id },
    };
    res.status(201).send(resp);
  } catch (error) {
    next(error);
  }
};

const getQuiz = async (req, res, next) => {
  let resp = getResponse();
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId, {
      name: 1,
      quetions_list: 1,
      answers: 1,
      created_by: 1,
    });

    if (!quiz) {
      const err = new ProjectError("Quiz not Found!");
      err.statusCode = 404;
      throw err;
    }
    console.log("creator", quiz.created_by.toString());
    console.log("User", req.userId);
    if (req.userId !== quiz.created_by.toString()) {
      const err = new ProjectError("You are not authorized!");
      err.statusCode = 403;
      throw err;
    }
    resp = {
      status: "success",
      message: "Quiz",
      data: { quiz },
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

const updateQuiz = async (req, res, next) => {
  let resp = getResponse();
  try {
    // validation
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      const err = new ProjectError("Validation Failed!");
      err.statusCode = 422;
      err.data = validationError.array();
      throw err;
    }
    const quizId = req.body._id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      const err = new ProjectError("Quiz not Found!");
      err.statusCode = 404;
      throw err;
    }
    if (req.userId !== quiz.created_by.toString()) {
      const err = new ProjectError("You are not authorized!");
      err.statusCode = 403;
      throw err;
    }
    if (quiz.is_publish) {
      const err = new ProjectError("You can not update , published Quiz!");
      err.statusCode = 405;
      throw err;
    }
    quiz.name = req.body.name;
    quiz.quetions_list = req.body.quetions_list;
    quiz.answers = req.body.answers;
    await quiz.save();
    resp = {
      status: "success",
      message: "Quiz updated successfully!",
      data: {},
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

const deleteQuiz = async (req, res, next) => {
  let resp = getResponse();
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      const err = new ProjectError("Quiz not Found!");
      err.statusCode = 404;
      throw err;
    }
    if (req.userId !== quiz.created_by.toString()) {
      const err = new ProjectError("You are not authorized!");
      err.statusCode = 403;
      throw err;
    }
    if (quiz.is_publish) {
      const err = new ProjectError("You can not delete , published Quiz!");
      err.statusCode = 405;
      throw err;
    }
    await Quiz.deleteOne({ _id: quizId });
    resp = {
      status: "success",
      message: "Quiz deleted successfully!",
      data: { quiz },
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

const publishQuiz = async (req, res, next) => {
  let resp = getResponse();
  try {
    const quizId = req.body.quizId;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      const err = new ProjectError("Quiz not Found!");
      err.statusCode = 404;
      throw err;
    }
    if (req.userId !== quiz.created_by.toString()) {
      const err = new ProjectError("You are not authorized!");
      err.statusCode = 403;
      throw err;
    }
    quiz.is_publish = true;
    await quiz.save();
    resp = {
      status: "success",
      message: "Quiz published!",
      data: {},
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

// const getAllQuiz = async (req, res, next) => {
//   let resp = getResponse();
//   try {
//     const quiz = await Quiz.find();
//     if (!quiz) {
//       const err = new ProjectError("There is no quiz here!");
//       err.statusCode = 404;
//       throw err;
//     }
//     for(q in quiz){
//       if (q.is_publish !== true) {
//         return;
//       } else {
//         resp = {
//           status: "success",
//           message: "Quiz",
//           data: { q },
//         };
//         res.status(200).send(resp);
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// };


module.exports = {
  createQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  publishQuiz,
};
