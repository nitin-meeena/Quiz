const Report = require("../models/reportModel");
const ProjectError = require("../helper/error");
const getResponse = require("../utils/response");

const getResult = async (req, res, next) => {
  let resp = getResponse();
  try {
    let report;
    if (!!req.params.reportId) {
      const reportId = req.params.reportId;
      if (report.userId.toString() !== req.userId) {
        const err = new ProjectError("You are not allowed!");
        err.statusCode = 405;
        throw err;
      }
      report = await Report.findById(reportId);
    }else{
        report = await Report.find({userId:req.userId});
    }

    if (!report) {
      const err = new ProjectError("No report found!");
      err.statusCode = 404;
      throw err;
    }

    resp = { status: "success", message: "Report!", data: { report } };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResult,
};
