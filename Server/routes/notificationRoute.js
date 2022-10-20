const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notificationController");

router
  .route("/")
  .get(notificationController.getAllNotifications)
  .post(notificationController.createNewNotification);

router
  .route("/:id")
  .get(notificationController.getSingleNotification)
  .patch(notificationController.updateNotification)
  .delete(notificationController.deleteNotification);

module.exports = router;