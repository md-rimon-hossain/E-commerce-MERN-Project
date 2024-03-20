const userRouter = require("express").Router();

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  processRegister,
  activateUserAccount,
  updateUserById,
  handleManegeUserStatusById,
  updatePassword,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");
const {
  validateUserRegistration,
  validateUserUpdatePassword,
  validateUserForgetPassword,
  validateUserResetPassword,
} = require("../validators/auth");

const { runValidation } = require("../validators");
const {uploadUserImage} = require("../middlewares/uploadFile");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");

userRouter.get("/", isLoggedIn, isAdmin, getAllUsers);
userRouter.get("/:id", isLoggedIn, getUserById);

// GET: /api/users --> process registration
userRouter.post(
  "/process-register",
  isLoggedOut,
  uploadUserImage.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);

// verify user and activate 
userRouter.post("/activate", isLoggedOut, activateUserAccount);

// Forget user password
userRouter.post(
  "/forget-password",
  isLoggedOut,
  validateUserForgetPassword,
  runValidation,
  forgetPassword
);

// Reset user password
userRouter.put(
  "/reset-password",
  validateUserResetPassword,
  runValidation,
  resetPassword
);

// update user 
userRouter.put(
  "/:id",
  isLoggedIn,
  uploadUserImage.single("image"),
  updateUserById
);


// update user password
userRouter.put(
  "/update-password/:id",
  validateUserUpdatePassword,
  runValidation,
  isLoggedIn,
  updatePassword
);


// banned and unBanned user status 
userRouter.put(
  "/manege-user/:id",
  isLoggedIn,
  isAdmin,
  handleManegeUserStatusById
);

// delete user 
userRouter.delete("/:id", isLoggedIn, deleteUserById);

module.exports = userRouter;
