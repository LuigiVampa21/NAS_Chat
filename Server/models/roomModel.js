const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    chat: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
        // required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
