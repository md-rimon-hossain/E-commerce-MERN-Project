const express = require("express");
const app = express();
const createError = require("http-errors");
const multer = require("multer");
const morgan = require("morgan");
const xssClean = require("xss-clean");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const path = require('path');
const cors = require("cors")

const { errorResponseHandler } = require("./controllers/responseController");

// all router is here
const userRouter = require("./routes/usersRouter");
const seedRouter = require("./routes/seedRouter");
const authRouter = require("./routes/authRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 50,
  message: "Too may request for this ip! Please try again Later.",
});

app.use(limiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-mern-project.vercel.app",
    ],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);


app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res, next) => {
  try {
    res
      .status(200)
      .json({ success: true, message: "Server is running successfully" });
    // next(createError(404, "Routes Not Found"));
  } catch (error) {
    res.status(500).send("error is here, Something Broke health route");
  }
});

// all router middlewares is here
app.use("/api/seed", seedRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.use((req, res, next) => {
  next(createError(404, "Route not Found!"));
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return errorResponseHandler(res, {
      statusCode: 400,
      message: err.message,
    });
  }
  return res.status(err.status || 500).json({
    statusCode: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
