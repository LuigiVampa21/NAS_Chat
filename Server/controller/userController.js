const fs = require("fs").promises;
const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");
const CustomError = require("../errors/index");

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
    if (rooms) {
      const alreadyPatched = patched(user.rooms);
      if (alreadyPatched) {
        throw new CustomError.BadRequestError("You are already chatting");
      }
      user.rooms.push(rooms);
    }
    if (friends) {
      const alreadyPatched = patched(user.friends);
      if (alreadyPatched) {
        throw new CustomError.BadRequestError("You are already friends");
      }
      user.friends.push(friends);
    }
    if (calls) {
      const alreadyPatched = patched(user.calls);
      if (alreadyPatched) {
        throw new CustomError.BadRequestError(
          "You have already made this call"
        );
      }
      user.calls.push(calls);
    }
    if (notifications) {
      const alreadyPatched = patched(user.notifications);
      if (alreadyPatched) {
        throw new CustomError.BadRequestError(
          "You have already received this information"
        );
      }
      user.notifications.push(notifications);
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

exports.deleteSingleNotification = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const { notifID } = req.body;
  const notifArray = [];
  user.notifications.forEach(n => {
    notifArray.push(n.toString().split('"').join());
  });
  const notifIndex = notifArray.findIndex(n => n == notifID);
  const newNotifArray = [...user.notifications];
  newNotifArray.splice(notifIndex, 1);
  user.notifications = newNotifArray;
  await user.save();
  res.status(StatusCodes.OK).json({
    newNotifArray,
  });
};

exports.uploadPhoto = async (req, res) => {
  const { id } = req.params;
  if (!req.file) {
    throw new CustomError.BadRequestError("No image found");
  }
  const { mimetype, size, filename } = req.file;
  console.log(req.file);
  if (!mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an image");
  }
  const maxSizeImg = process.env.MAX_FILE_SIZE * process.env.MAX_FILE_SIZE;
  if (size > maxSizeImg) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB"
    );
  }

  const user = await User.findByIdAndUpdate(id, { photo: filename });

  await fs.unlink("../Client/src/assets/images/" + filename);

  user.save();
  res.status(StatusCodes.OK).json({
    msg: "image successfully uploaded!",
    user,
  });
};

exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(id);

  const passwordMatch = await user.comparePassword(oldPassword);
  if (!passwordMatch) {
    throw new CustomError.BadRequestError("Wrong password");
  }
  user.password = newPassword;
  user.save();
  res.status(StatusCodes.OK).json({
    msg: "password updated !",
  });
};

const patched = field => {
  field.some(f => f._id === field);
};
