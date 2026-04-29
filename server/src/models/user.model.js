const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    plan: {
      type: String,
      enum: ["FREE", "PRO", "TEAM"],
      default: "FREE",
    },

    dailyGenerateCount: {
      type: Number,
      default: 0,
    },

    lastResetDate: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE"],
      default: "PENDING",
    },

    otp: {
      type: String,
      select: false,
    },

    otpExpire: {
      type: Date,
      index: { expires: 0 },
    },

    resetOtp: {
      type: String,
      select: false,
    },

    resetOtpExpire: {
      type: Date,
    },

    loginAttempt: {
      type: Number,
      default: 0,
    },

    lockUntil: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
