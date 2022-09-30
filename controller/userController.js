const { StatusCodes } = require("http-status-codes");
const User = require("../Models/userModel");

exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.status(StatusCodes.OK).json({
    status: "success",
    results: allUsers.length,
    allUsers,
  });
};

// exports.createNewUser = async (req, res) => {
//   const newUser = await User.create(req.body);
//   res.status(StatusCodes.CREATED).json({
//     status: "success",
//     data: newUser,
//   });
// };

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(StatusCodes.OK).json({
    status: "success",
    user,
  });
};

exports.updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({
    status: "success",
    msg: "Update user",
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(StatusCodes.NO_CONTENT).json({
    msg: null,
  });
};
