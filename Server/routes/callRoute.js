const express = require("express");
const router = express.Router();
const callController = require("../controller/callController");

router
  .route("/")
  .get(callController.getAllCalls)
  .post(callController.createNewCall);

router
  .route("/:id")
  .get(callController.getSingleCall)
  .patch(callController.updateCall)
  .delete(callController.deleteCall);

module.exports = router;
