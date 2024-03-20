const {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleProtectedRoute,
} = require("../controllers/authController");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");
const { runValidation } = require("../validators");
const {
  validateUserLogin,
} = require("../validators/auth");

const authRouter = require("express").Router();

authRouter.post(
  "/login",
  validateUserLogin,
  runValidation,
  isLoggedOut,
  handleLogin
);

authRouter.post("/logout", isLoggedIn, handleLogout);

// refresh token route
authRouter.get(
  "/refresh-token",
  handleRefreshToken
);

// protected route 
authRouter.get(
  "/protected",
  handleProtectedRoute
);

module.exports = authRouter;
