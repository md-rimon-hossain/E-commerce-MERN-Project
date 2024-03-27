const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const { successResponseHandler } = require("./responseController");
const {
  jwtActivationKey,
  clientURL,
  JwtResetPasswordKey,
} = require("../secret");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const { sendEmailWithNodeMailer } = require("../helper/email");
const { findWithId } = require("../services/findItem");
const {
  handleUserAction,
  handleFindUserById,
  handleDeleteUserById,
  handleFindUsers,
  handleUpdateUserById,
  handleUpdateUserPasswordById,
  handleForgetPasswordByEmail,
  handleResetPasswordByToken,
} = require("../services/userService");
const cloudinary = require("../config/cloudinary");

//GET: /api/users --controller
const getAllUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit) || 5;

    const { users, pagination } = await handleFindUsers(search, limit, page);

    successResponseHandler(res, {
      statusCode: 200,
      message: "Users were return successfully",
      payload: {
        users: users,
        pagination: pagination,
      },
    });
  } catch (error) {
    next(error);
  }
};

// find single user by id admin
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await handleFindUserById(id, options);

    return successResponseHandler(res, {
      statusCode: 200,
      message: "Users were return successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

// delete user and image find by id
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    await handleDeleteUserById(id, options);

    return successResponseHandler(res, {
      statusCode: 200,
      message: "Users was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// registration process
const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const image = req.file?.path;

    // image maximum size 2mb
    if (image && image.size > 2097152) {
      throw createError(
        400,
        "image file is too large. it must be less than 2 MB"
      );
    }

    const existsUser = await User.exists({ email: email });
    if (existsUser) {
      throw createError(
        409,
        "User already exists with this email. Please login"
      );
    }

    const tokenPayloadData = { name, email, password, phone, address };

    if (image) {
      tokenPayloadData.image = image;
    }

    // json web token
    const token = createJSONWebToken(tokenPayloadData, jwtActivationKey, "10m");

    // prepare email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
        <h2>Hello ${name}</h2>
        <p>Please click here to <a href="${clientURL}/users/activate/${token}"target="_blank"> activate Your Account</a></p>
        `,
    };

    // send email with node mailer
    try {
      await sendEmailWithNodeMailer(emailData);
    } catch (emailError) {
      next(createError(500, "failed to send verification email"));
      return;
    }

    return successResponseHandler(res, {
      statusCode: 200,
      message: `please go to your ${email} address for completing your registration process `,
      payload: {
        token,
      },
    });
    
  } catch (error) {
    next(error);
  }
};

// activate User Account
const activateUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token
    if (!token) {
      throw createError(404, "Token not Found");
    }
    
    
    try {
      const decoded = jwt.verify(token, jwtActivationKey);
      console.log("|fjldsfjk");
      if (!decoded) {
        throw createError(401, "Unable to verify User");
      }
      
      const existsUser = await User.exists({ email: decoded.email });
      if (existsUser) {
        throw createError(
          409,
          "User already exists with this email. Please login"
        );
      }

      
      // cloudinary upload image 
      const image = decoded.image;
      if (image) {
        const response = await cloudinary.uploader.upload(image, {
          folder: "ecommerceMern/users",
        });
        decoded.image = response.secure_url;
      }

      // create user
      await User.create(decoded);

      return successResponseHandler(res, {
        statusCode: 201,
        message: `User was register successfully`,
        payload: {
          decoded,
        },
      });

    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "token has expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createError(401, "invalid Token");
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
};

// update user
const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await handleUpdateUserById(userId, req);

    return successResponseHandler(res, {
      statusCode: 200,
      message: "Users was Updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// update user password
const updatePassword = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword, confirmedPassword } = req.body;
    const userId = req.params.id;

    const UpdatedPasswordUser = await handleUpdateUserPasswordById(
      userId,
      email,
      oldPassword,
      newPassword,
      confirmedPassword
    );

    return successResponseHandler(res, {
      statusCode: 200,
      message: "User password was Updated successfully",
      payload: { UpdatedPasswordUser },
    });
  } catch (error) {
    next(error);
  }
};

// Forget password user
const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await handleForgetPasswordByEmail(email);

    return successResponseHandler(res, {
      statusCode: 200,
      message: `please go to your ${email} to Reset Your Password `,
      payload: {
        token,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// reset password user
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    await handleResetPasswordByToken(token, password);

    return successResponseHandler(res, {
      statusCode: 200,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

// handle banned user
const handleManegeUserStatusById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const action = req.body.action;
    await findWithId(User, userId);

    // handle user action from services
    const { updatedUser, successMessage } = await handleUserAction(
      userId,
      action
    );

    return successResponseHandler(res, {
      statusCode: 200,
      message: successMessage,
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
