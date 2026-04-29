const AppError = require("./AppError");

const ApiError = (err) => {
  if (err?.status === 503 || err?.message?.includes("503")) {
    throw new AppError(
      503,
      "AI service is temporarily busy. Please try again.",
    );
  }

  if (err?.status === 429 || err?.message?.includes("rate_limit")) {
    throw new AppError(429, "AI rate limit reached. Try again in a moment.");
  }

  throw new AppError(
    500,
    err?.message || "Something went wrong with AI provider",
  );
};

module.exports = ApiError;
