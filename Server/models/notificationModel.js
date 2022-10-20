const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    sort: {
      type: String,
      enum: ["Friend Request", "New Message", "Call incoming"],
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Seen", "Pending", "Archived"],
      defaut: "pending",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
