const { rateLimit } = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  keyGenerator: (req) => `ip_${req.ip}_login`,
  message: {
    success: false,
    message: "Too many login attempts from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const otpEmailLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 3,
  keyGenerator: (req) => `email_${req.body?.email || "unknown"}`,
  message: {
    success: false,
    message: "Too many OTP requests for this email. Try again in 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const otpIpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  keyGenerator: (req) => `ip_${req.ip}`,
  message: {
    success: false,
    message:
      "Too many OTP requests from your network. Try again in 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { otpEmailLimiter, otpIpLimiter, loginLimiter };
