const express = require("express");
const {getResult} = require("../controllers/report");
const { isAuthenticate } = require("../middlewares/isAuthenticate");


const router = express.Router();

// GET /report/:resultId
router.get("/:reportId?",isAuthenticate, getResult);

// GET /report/
// router.get("/:resultId", getResult);


module.exports = router;