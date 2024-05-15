const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema(
    {
      userId: {
        type:mongoose.Types.ObjectId,
        required: true,
      },
      quizId: {
        type:mongoose.Types.ObjectId,
        required: true,
      },
      score: {
        type:Number,
        required: true,
      },
      total: {
        type:Number,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const Report = mongoose.model("report", reportSchema);
  module.exports = Report;