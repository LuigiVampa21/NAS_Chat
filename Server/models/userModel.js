const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You have to provide a name"],
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "You have to provide a name"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    pseudo: {
      type: String,
      unique: true,
      required: [true, "You have to provide a pseudo"],
      minlength: 3,
      maxlength: 20,
    },
    photo: {
      type: String,
      default: "defaultUser.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "You have to provide a password"],
      minlength: 8,
    },
    confirmPassword: {
      type: String,
      required: [true, "You have to confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords does not match",
      },
      select: false,
    },
    rooms: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
      },
    ],
    calls: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidate) {
  const isMatch = await bcrypt.compare(candidate, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
