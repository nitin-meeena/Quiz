const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    quetions_list: [
      {
        quetion_number: {
          type:Number,
          // required: true, 
        },
        quetion: String,
        options: {},
      },
    ],
    answers: {},
    created_by: {
        type:mongoose.Types.ObjectId,
        required: true,
    },
    is_publish: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("quiz", quizSchema);
module.exports = Quiz;