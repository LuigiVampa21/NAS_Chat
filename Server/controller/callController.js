const { StatusCodes } = require("http-status-codes");
const Call = require("../models/callModel");
// require CustomError from

exports.getAllCalls = async (req, res) => {
  const allCalls = await Call.find();
  res.status(StatusCodes.OK).json({
    results: allCalls.length,
    allCalls,
  });
};

exports.createNewCall = async (req, res) => {
  // check if Call in req.body
  const { users, type, duration } = req.body;
  if (!users || !type || !duration) return;
  const newCall = await Call.create({ users, type, duration });
  res.status(StatusCodes.CREATED).json({
    newCall,
  });
};

exports.getSingleCall = async (req, res) => {
  const { id } = req.params;
  // check if id exists
  const call = await Call.findById(id).populate("users");
  res.status(StatusCodes.OK).json({
    call,
  });
};

exports.updateCall = async (req, res) => {
  // check if id exists
  const { id } = req.params;
  const { duration, stauts } = req.body;

  const callUpdated = await Call.findByIdAndUpdate(id, req.body);
  res.status(StatusCodes.OK).json({
    callUpdated,
  });
};

exports.deleteCall = async (req, res) => {
  const { id } = req.params;
  // check if id exists

  await Call.findByIdAndDelete(id);
  res.status(StatusCodes.NO_CONTENT).json({
    msg: null,
  });
};
