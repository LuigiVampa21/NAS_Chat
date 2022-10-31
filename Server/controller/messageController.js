const { StatusCodes } = require("http-status-codes");
const Message = require("../models/messageModel");
// require CustomError from

exports.getAllMessages = async (req, res) => {
  const allMessages = await Message.find();
  res.status(StatusCodes.OK).json({
    results: allMessages.length,
    allMessages,
  });
};

exports.createNewMessage = async (req, res) => {
  // check if message in req.body
  const { content, room, poster } = req.body;
  if (!content || !room || !poster) return;
  const newMessage = await Message.create(req.body);
  res.status(StatusCodes.CREATED).json({
    newMessage,
  });
};

exports.getSingleMessage = async (req, res) => {
  const { id } = req.params;
  // check if id exists
  const message = await Message.findById(id).populate('room');
  res.status(StatusCodes.OK).json({
    message,
  });
};

exports.updateMessage = async (req, res) => {
  // check if id exists

  res.status(StatusCodes.OK).json({
    msg: "message updated",
  });
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  // check if id exists

  await Message.findByIdAndDelete(id);
  res.status(StatusCodes.NO_CONTENT).json({
    msg: null,
  });
};
