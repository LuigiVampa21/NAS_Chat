const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const fileMiddleware = require("../middleware/fileMidlleware");

router.route("/").get(userController.getAllUsers);

router
  .route("/delete/notification/:id")
  .patch(userController.deleteSingleNotification);

router
  .route("/upload-photo/:id")
  .post(fileMiddleware.uploadPhoto, userController.uploadPhoto);

router.route("/update-password/:id").patch(userController.updatePassword);

router.route("/:id/friends").get(userController.getSingleUserWithFriends);
router.route("/:id/rooms").get(userController.getSingleUserWithRooms);
router.route("/:id/calls").get(userController.getSingleUserWithCalls);
router
  .route("/:id/notifications")
  .get(userController.getSingleUserWithNotifications);

router
  .route("/:id")
  .get(userController.getSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
