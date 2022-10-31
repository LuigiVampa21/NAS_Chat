const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendResetPasswordEmail = require("../email/sendResetPassword");
const sendVerificationEmail = require("../email/sendVerificationEmail");
const hashString = require("../utils/createHash");

exports.register = async (req, res) => {
  const { email, name, password, confirmPassword, pseudo, phone } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Sorry this email already exists");
  }
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    email,
    name,
    password,
    confirmPassword,
    phone,
    pseudo,
    verificationToken,
  });
  // if (!user) {
  //   throw new CustomError.BadRequestError(
  //     "Oops.. Someting went wrong try again later"
  //   );
  // }
  await sendVerificationEmail(name, email, verificationToken);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: user,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    throw new CustomError.BadRequestError(
      "Please provide email and/or password"
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("Sorry No user found");
  }
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    throw new CustomError.BadRequestError("Sorry password does not match");
  }

  if (!user.isVerified) {
    throw new CustomError.BadRequestError("Please verify your email");
  }

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
  });

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

exports.resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new CustomError.BadRequestError("Invalid credentials");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("no user found with that email");
  }
  const currentDate = new Date();
  if (
    user.passwordToken === hashString(token) &&
    user.passwordTokenExpirationDate > currentDate
  ) {
    user.password = password;
    user.passwordToken = null;
    user.passwordTokenExpirationDate = null;
    await user.save();
  }
  res.status(StatusCodes.OK).json({ msg: "ok" });
};

exports.verifyEmail = async (req, res) => {
  const { token, email } = req.body;
  if (!token) {
    throw new CustomError.BadRequestError("Sorry no token found");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("Sorry no user found");
  }
  console.log(user);
  if (user.verificationToken != token) {
    throw new CustomError.BadRequestError("Sorry your token does not match");
  }
  user.isVerified = true;
  user.verificationToken = "";
  await user.save();
  res.status(StatusCodes.OK).json({
    msg: "email verified",
    verificationToken,
    user,
  });
};
