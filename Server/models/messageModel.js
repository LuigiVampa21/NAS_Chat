const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
      delivered: Boolean,
      read: Boolean,
    },
    users: {
      type: mongoose.Schema.ObjectId,
      ref: "useModel",
      // by default users into current room
      // required: true,
    },
    // sender: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
