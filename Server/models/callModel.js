const mongoose = require("mongoose");

const CallSchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: [true, "You have to provide a group name"],
    //   minlength: 5,
    //   maxlength: 20,
    // },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    duration: {
      type: String,
      required: true,
    },
    type: {
      enum: {
        values: ["vocal", "visio", "conference"],
        message: "A call is either vocal, visio or conference",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Call", CallSchema);
