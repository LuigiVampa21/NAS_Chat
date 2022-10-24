const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendResetPasswordEmail = require("../email/sendResetPassword");

exports.register = async (req, res) => {
  const { email, name, password, confirmPassword, pseudo } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Sorry this email already exists");
  }
  const user = await User.create({
    email,
    name,
    password,
    confirmPassword,
    pseudo,
  });
  if (!user) {
    throw new CustomError.BadRequestError(
      "Oops.. Someting went wrong try again later"
    );
  }
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: user,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide email and/or password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Sorry No user found");
  }
  // const passwordMatch = await user.comparePassword(password);
  // if (!passwordMatch) {
  //   throw new Error("Sorry password does not match");
  // }

  const token = jwt.sign(
    { email: user.email, userID: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    user,
    token,
    expiring: +process.env.JWT_EXPIRES_IN_SEC,
  });
};

exports.forgotPassword = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Please provide email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("No user found with that email");
  }
  const passwordToken = crypto.randomBytes(70).toString("hex");

  await sendResetPasswordEmail({
    name: user.name,
    email: user.email,
    token: passwordToken,
    origin: process.env.ORIGIN,
  });

  // const tenMinutes = 1000 * 60 * 10;
  const passwordTokenExpirationDate = new Date(
    Date.now() + eval(process.env.EXP_RESET_PASSWORD)
  );
  user.passwordToken = hashString(passwordToken);
  user.passwordTokenExpirationDate = passwordTokenExpirationDate;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email to reset your password" });
};

exports.resetPassword = async (req, res) => {};
