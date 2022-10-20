const { StatusCodes } = require("http-status-codes");
const Notification = require("../models/notificationModel");
// require CustomError from

exports.getAllNotifications = async (req, res) => {
  const allNotifications = await Notification.find();
  res.status(StatusCodes.OK).json({
    results: allNotifications.length,
    allNotifications,
  });
};

exports.createNewNotification = async (req, res) => {
  // check if Notification in req.body
  const { sort, from, room, status } = req.body;
  if (!sort || !from) return;
  const newNotification = await Notification.create(req.body);
  res.status(StatusCodes.CREATED).json({
    newNotification,
  });
};

exports.getSingleNotification = async (req, res) => {
  const { id } = req.params;
  // check if id exists
  const notification = await Notification.findById(id);
  res.status(StatusCodes.OK).json({
    notification,
  });
};

exports.updateNotification = async (req, res) => {
  // check if id exists

  res.status(StatusCodes.OK).json({
    msg: "Notification updated",
  });
};

exports.deleteNotification = async (req, res) => {
  const { id } = req.params;
  // check if id exists

  await Notification.findByIdAndDelete(id);
  res.status(StatusCodes.NO_CONTENT).json({
    msg: null,
  });
};
