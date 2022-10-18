const { StatusCodes } = require("http-status-codes");
const Room = require("../models/roomModel");

// Get all Rooms
exports.getAllRooms = async (req, res) => {
  const allRooms = await Room.find();
  res.status(StatusCodes.OK).json({
    results: allRooms.length,
    allRooms,
  });
};

//  Create new Room

exports.createNewRoom = async (req, res) => {
  // Check if inupt name & users
  // check if users match existings users
  // check if name already exists
  const newRoom = await Room.create(req.body);
  res.status(StatusCodes.CREATED).json({
    newRoom,
  });
};

// Get Single Room

exports.GetSingleRoom = async (req, res) => {
  const { id } = req.params;
  // check if room exists
  const room = await Room.findById(id);
  res.status(StatusCodes.OK).json({
    room,
  });
};

// Update Room

exports.updateRoom = async (req, res) => {
  // Check if inupt name & users
  // check if users match existings users
  // check if name already exists
  res.status(StatusCodes.OK).json({
    msg: "Room user",
  });
};

//  Delete Room

exports.deleteRoom = async (req, res) => {
  const { id } = req.params;
  // Check if inupt name & users
  await Room.findByIdAndDelete(id);
  res.status(StatusCodes.NO_CONTENT).json({
    msg: null,
  });
};

// Action USER TO Room != id

// ajouter un membre à un Roome

// exports.addUser2Room = async (req, res) => {
//   const newRoom = await Room.create();
//   res.status(StatusCodes.OK).json({
//     status: "success",
//     results: newRoom.length,
//     newRoom,
//   });
// };

// supprimer un membre d'un Roome

// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;
//   await Group.findByIdAndDelete(id);
//   res.status(StatusCodes.NO_CONTENT).json({
//     msg: null,
//   });
// };
