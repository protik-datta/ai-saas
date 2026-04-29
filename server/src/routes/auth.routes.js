const express = require("express");
const router = express.Router();
const multer = require("multer");
const validate = require("../middlewares/validate.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  registerSchema,
  resendOtpSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  deleteUserSchema,
} = require("../validation/auth.validation");

const { otpEmailLimiter, otpIpLimiter, loginLimiter } = require("../middlewares/otpLimit.middleware");
const {
  register,
  verifyOtp,
  login,
  logout,
  getMe,
  deleteUser,
  resendOtp,
  forgetPassword,
  resetPassword,
} = require("../controller/auth.controller");
const {
  getHistory,
  clearAllHistory,
  deleteHistoryItem,
  deleteHistoryByTool,
} = require("../controller/history.controller");
const generateMiddleware = require("../middlewares/generate.middleware");
const creditMiddleware = require("../middlewares/credit.middleware");

const upload = multer();

router.post(
  "/register",
  otpIpLimiter,
  otpEmailLimiter,
  upload.none(),
  validate(registerSchema),
  register,
);

router.post("/verify-otp", upload.none(), verifyOtp);
router.post("/login", loginLimiter, upload.none(), login);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, creditMiddleware, getMe);

router.post(
  "/resend-otp",
  otpIpLimiter,
  otpEmailLimiter,
  upload.none(),
  validate(resendOtpSchema),
  resendOtp,
);

router.post(
  "/forget-password",
  otpIpLimiter,
  otpEmailLimiter,
  upload.none(),
  validate(forgetPasswordSchema),
  forgetPassword,
);

router.post(
  "/reset-password/:token",
  upload.none(),
  validate(resetPasswordSchema),
  resetPassword,
);

router.delete(
  "/delete",
  authMiddleware,
  upload.none(),
  validate(deleteUserSchema),
  deleteUser,
);

router.get("/history", authMiddleware, getHistory);

router.delete("/history", authMiddleware, clearAllHistory);

router.delete(
  "/history/:historyId",
  authMiddleware,
  deleteHistoryItem,
);

router.delete(
  "/history/tool/:tool",
  authMiddleware,
  deleteHistoryByTool,
);

module.exports = router;
