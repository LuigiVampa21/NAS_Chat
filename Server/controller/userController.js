const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.status(StatusCodes.OK).json({
    results: allUsers.length,
    allUsers,
  });
};

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(StatusCodes.OK).json({
    user,
  });
};

exports.getSingleUserWithFriends = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("friends");
  res.status(StatusCodes.OK).json({
    user,
  });
};

exports.getSingleUserWithNotifications = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("notifications");
  res.status(StatusCodes.OK).json({
    user,
  });
};

exports.getSingleUserWithRooms = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("rooms");
  res.status(StatusCodes.OK).json({
    user,
  });
};

exports.getSingleUserWithCalls = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("calls");
  res.status(StatusCodes.OK).json({
    user,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, pseudo, photo, friends, calls, rooms, notifications } =
    req.body;
  if (!friends && !calls && !rooms && !notifications) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(StatusCodes.OK).json({
      user,
    });
  } else {
    const user = await User.findById(id);
    // console.log(user);
    if (rooms) {
      user.rooms.push(rooms);
      // console.log(user.rooms);
    }
    if (friends) {
      user.friends.push(friends);
      // console.log(user.friends);
    }
    if (calls) {
      user.calls.push(calls);
      // console.log(user.calls);
    }
    if (notifications) {
      user.notifications.push(notifications);
      console.log(user.notifications);
    }
    await user.save();
    res.status(StatusCodes.OK).json({
      user,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(StatusCodes.NO_CONTENT).json({
    msg: null,
  });
};
