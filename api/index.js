// Build an apiRouter using express Router
const { application } = require("express");
const apiRouter = require("express").Router();
const express = require("express");
const server = express();
const Router = express.Router;

server.get("/", (req, res) => {
  res.send("hello there");
});

// Import the database adapter functions from the db
const {
  createReport,
  getOpenReports,
  closeReport,
  createReportComment,
} = require("../db");

/**
 * Set up a GET request for /reports
 *
 * - it should use an async function
 * - it should await a call to getOpenReports
 * - on success, it should send back an object like { reports: theReports }
 * - on caught error, call next(error)
 */
apiRouter.get("reports", async (req, res, next) => {
  try {
    const theReports = await getOpenReports();
    res.send({ reports: openReports });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

/**
 * Set up a POST request for /reports
 *
 * - it should use an async function
 * - it should await a call to createReport, passing in the fields from req.body
 * - on success, it should send back the object returned by createReport
 * - on caught error, call next(error)
 */
apiRouter.post("/reports", async (req, res, next) => {
  try {
    const newReport = await createReport(req.body);
    res.send(newReport);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

/**
 * Set up a DELETE request for /reports/:reportId
 *
 * - it should use an async function
 * - it should await a call to closeReport, passing in the reportId from req.params
 *   and the password from req.body
 * - on success, it should send back the object returned by closeReport
 * - on caught error, call next(error)
 */
apiRouter.delete("/reports", async (req, res, next) => {
  try {
    const reportId = req.params.reportId;
    const password = req.body.password;
    const closedReport = await closeReport(reportId, password);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

/**
 * Set up a POST request for /reports/:reportId/comments
 *
 * - it should use an async function
 * - it should await a call to createReportComment, passing in the reportId and
 *   the fields from req.body
 * - on success, it should send back the object returned by createReportComment
 * - on caught error, call next(error)
 */
apiRouter.post("/reports/:reportId/comments", async (req, res, next) => {
  try {
    const reportId = req.params.reportId;
    const comment = req.body;
    const newReportComment = await createReportComment(reportId, comment);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// Export the apiRouter
module.exports = apiRouter;