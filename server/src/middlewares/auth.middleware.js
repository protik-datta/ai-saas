const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new AppError(401, "Not authorized, please login"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError(401, "User no longer exists"));
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return next(new AppError(401, "Invalid token, please login again"));
    }
    if (err.name === "TokenExpiredError") {
      return next(new AppError(401, "Session expired, please login again"));
    }
    next(err);
  }
};

module.exports = authMiddleware;
