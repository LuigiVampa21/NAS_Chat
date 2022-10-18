const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.status(StatusCodes.OK).json({
    status: "success",
    results: allUsers.length,
    allUsers,
  });
};

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("friends");
  res.status(StatusCodes.OK).json({
    // status: "success",
    user,
  });
};

exports.updateUser = async (req, res) => {
  const { name, email, pseudo, photo, friends } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({
    status: "success",
    user,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(StatusCodes.NO_CONTENT).json({
    msg: null,
  });
};
