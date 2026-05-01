require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const hpp = require("hpp");
const app = express();
app.set("trust proxy", 1);

// --- Security ---
app.use(helmet());
app.use(hpp());

// --- Logging ---
const isProduction = process.env.NODE_ENV === "production";
app.use(morgan(isProduction ? "combined" : "dev"));

// --- CORS ---
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

// --- Rate Limiting ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// --- Body Parsing ---
app.use(compression());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// --- Database ---
// const connectDB = require("./src/config/db");
// connectDB();


// ---------------------------------------------------------------- //
const authRoutes = require("./src/routes/auth.routes");
app.use("/api/v1/auth", authRoutes);

const aiRoutes = require("./src/routes/ai.routes");
app.use("/api/v1/ai", aiRoutes);
// ---------------------------------------------------------------- //

const {
  errorHandler,
  notFoundHandler,
} = require("./src/middlewares/error.middleware");

// --- Global Error Handler ---
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
