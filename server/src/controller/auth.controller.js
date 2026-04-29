const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const generateOTP = require("../utils/generateOTP");
const crypto = require("crypto");
const logger = require("../utils/logger");
const {
  verifyRegistration,
  resendCode,
  forgotPassword,
  passwordChanged,
} = require("../utils/templates");
const { sendEmail } = require("../utils/sendEmail");
const { generateAccessToken } = require("../utils/token");

const OTP_EXPIRE_TIME = 10 * 60 * 1000; // 10 minutes

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const clearAuthCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    throw new AppError(400, "User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const otp = generateOTP();

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    otp,
    otpExpire: new Date(Date.now() + OTP_EXPIRE_TIME),
    status: "PENDING",
    isVerified: false,
  });

  try {
    const mail = verifyRegistration({ to: email, otp });
    await sendEmail(mail.to, mail.subject, mail.text, mail.html);
  } catch (error) {
    await User.deleteOne({ _id: user._id });
    logger.error(`OTP email failed for ${email}: ${error.message}`);
    throw new AppError(500, "Failed to send OTP email. Please try again.");
  }

  res.status(201).json({
    success: true,
    message: "OTP sent to email",
    userId: user._id,
  });
});

exports.verifyOtp = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    throw new AppError(400, "OTP is required");
  }

  const user = await User.findOne({
    otp,
    otpExpire: { $gt: Date.now() },
  }).select("+otp +otpExpire");

  if (!user) {
    throw new AppError(404, "Invalid OTP or User not found");
  }

  if (user.isVerified) {
    throw new AppError(400, "User already verified");
  }

  if (!user.otpExpire || user.otpExpire < Date.now()) {
    await User.deleteOne({ _id: user._id });
    throw new AppError(400, "OTP expired. Please register again.");
  }

  if (user.otp !== otp) {
    throw new AppError(400, "Invalid OTP");
  }

  user.isVerified = true;
  user.status = "ACTIVE";
  user.otp = undefined;
  user.otpExpire = undefined;

  await user.save();

  const token = generateAccessToken(user._id);
  setAuthCookie(res, token);

  res.status(200).json({
    success: true,
    message: "Account verified successfully",
    token,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(400, "Invalid credentials");
  }

  if (!user.isVerified) {
    throw new AppError(400, "Please verify your email");
  }

  if (user.lockUntil && user.lockUntil > Date.now()) {
    const waitTime = Math.ceil((user.lockUntil - Date.now()) / 60000);

    throw new AppError(
      403,
      `Account locked. Try again after ${waitTime} minute(s)`,
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    user.loginAttempt += 1;

    if (user.loginAttempt >= 5) {
      user.lockUntil = new Date(Date.now() + OTP_EXPIRE_TIME);
      user.loginAttempt = 0;
    }

    await user.save();

    throw new AppError(400, "Invalid credentials");
  }

  user.loginAttempt = 0;
  user.lockUntil = null;
  await user.save();

  const token = generateAccessToken(user._id);
  setAuthCookie(res, token);

  res.status(200).json({
    success: true,
    message: "Login Successfully",
    token,
  });
});

exports.logout = asyncHandler(async (req, res) => {
  clearAuthCookie(res);

  res.status(200).json({ message: "Logout successful" });
});

exports.getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new AppError(404, "No user found");
  }

  res.json({
    success: true,
    user,
    credit: req.creditMeta,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(400, "Invalid password. Account deletion aborted.");
  }

  await user.deleteOne();

  clearAuthCookie(res);

  res.status(200).json({
    success: true,
    message: "User account deleted successfully",
  });
});

exports.resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.isVerified) {
    throw new AppError(400, "User is already verified");
  }

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpire = new Date(Date.now() + OTP_EXPIRE_TIME);
  await user.save();

  try {
    const mail = resendCode({ to: email, otp });
    await sendEmail(mail.to, mail.subject, mail.text, mail.html);
  } catch (error) {
    logger.error(`Resend OTP email failed for ${email}: ${error.message}`);
    throw new AppError(500, "Failed to send OTP email. Please try again.");
  }

  res.status(200).json({ success: true, message: "OTP resent successfully" });
});

exports.forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetOtp = hashedToken;
  user.resetOtpExpire = new Date(Date.now() + OTP_EXPIRE_TIME); // 10 mins
  await user.save({ validateBeforeSave: false });

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

  try {
    const mail = forgotPassword({
      to: email,
      resetUrl,
      expiresInMinutes: 10,
    });
    await sendEmail(mail.to, mail.subject, mail.text, mail.html);
  } catch (error) {
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    await user.save({ validateBeforeSave: false });

    logger.error(`Forgot password email failed for ${email}: ${error.message}`);
    throw new AppError(500, "Failed to send reset email. Please try again.");
  }

  res
    .status(200)
    .json({ success: true, message: "Password reset link sent to email" });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  let { token } = req.params;
  const { password } = req.body;

  if (!token) {
    throw new AppError(400, "Reset token is required");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetOtp: hashedToken,
    resetOtpExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError(400, "Invalid or expired reset token");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;
  user.resetOtp = undefined;
  user.resetOtpExpire = undefined;
  user.loginAttempt = 0;
  user.lockUntil = null;
  await user.save();

  try {
    const mail = passwordChanged({ to: user.email });
    sendEmail(mail.to, mail.subject, mail.text, mail.html).catch((error) => {
      logger.error(
        `Password changed confirmation email failed for ${user.email}: ${error.message}`,
      );
    });
  } catch (error) {
    logger.error(
      `Password changed confirmation email preparation failed for ${user.email}: ${error.message}`,
    );
  }

  res.status(200).json({ success: true, message: "Password reset successful" });
});
