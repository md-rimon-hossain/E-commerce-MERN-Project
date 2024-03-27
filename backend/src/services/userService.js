const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const cloudinary = require("../config/cloudinary");
const { deleteImage } = require("../helper/deleteImage");
const { JwtResetPasswordKey, clientURL } = require("../secret");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const { sendEmailWithNodeMailer } = require("../helper/email");
const { publicIdWithoutExtension } = require("../helper/cludinaryHelper");
const { log } = require("winston");
// Find All Users for Admin
const handleFindUsers = async (search, limit, page) => {
  try {
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    // count all users without admin
    const count = await User.find(filter, options).countDocuments();

    if (!users || users.length === 0) throw createError(404, "no users found");

    return {
      users,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Find User By id
const handleFindUserById = async (id, options = {}) => {
  try {
    const user = await User.findById(id, options);
    if (!user) {
      throw createError(404, `User does not exist with this id`);
    }
    return user;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid Id");
    }
    throw error;
  }
};

// delete User By id
const handleDeleteUserById = async (id, options = {}) => {
  try {
    const existingUser = await User.findOne({ _id: id });

    if (!existingUser) {
      throw createError(404, `User does not exist with this id`);
    }

    if (existingUser && existingUser.image) {
      if (!(existingUser.image === "./public/images/users/default.jpg")) {
        const publicId = await publicIdWithoutExtension(existingUser.image);
        const { result } = await cloudinary.uploader.destroy(
          `ecommerceMern/users/${publicId}`
        );
        if (result !== "ok") {
          throw new Error(
            "User image was not deleted successfully from cloudinary. Please try again"
          );
        }
      }
    }

    await User.findByIdAndDelete({ _id: id, isAdmin: false });

    // find image path and delete --> localServer image
    // const userImagePath = existingUser?.image;
    // userImagePath !== "./public/images/users/default.jpg" &&
    //   deleteImage(userImagePath);
    
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid Id");
    }
    throw error;
  }
};

// update User By id
const handleUpdateUserById = async (userId, req) => {
  try {
    const options = { password: 0 };
    const user = await handleFindUserById(userId, options);
    const updateOptions = { new: true, runValidators: true, context: "query" };
    let updatesUserValue = {};

    // name, email, password, image, phone, address
    for (const key in req.body) {
      if (["name", "password", "phone", "address"].includes(key)) {
        updatesUserValue[key] = req.body[key];
      } else if (key === "email") {
        throw createError(400, "Email can not be Updated");
      }
    }

    const image = req.file?.path;
    if (image) {
      // image maximum size 2mb
      if (image.size > 2097152) {
        throw createError(
          400,
          "image file is too large. it must be less than 2 MB"
        );
      }

      //*** when store image my own server ***/
      // updatesUserValue.image = image;
      // user.image !== "./public/images/users/default.jpg" &&
      //   deleteImage(user.image);

      const response = await cloudinary.uploader.upload(image, {
        folder: "ecommerceMern/users",
      });
      updatesUserValue.image = response.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatesUserValue,
      updateOptions
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User with this Id does not exist");
    }

    // delete the previous product image from cloudinary
  if(user.image){
    const publicId = await publicIdWithoutExtension(user.image)
    const {result} = await cloudinary.uploader.destroy(`ecommerceMern/users/${publicId}`)
    if(result !== "ok"){
      throw new Error("Previous User image was not deleted successfully from cloudinary. Please try again")
    }
  }

    return updatedUser;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid Id");
    }
    throw error;
  }
};

// update User By id
const handleUpdateUserPasswordById = async (
  userId,
  email,
  oldPassword,
  newPassword,
  confirmedPassword
) => {
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw createError(404, "User does not found with this email");
    }

    if (!newPassword === confirmedPassword) {
      throw createError(
        400,
        "new password and confirmed password did not match"
      );
    }

    // // Compare passwords
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      throw createError(400, "Old Password did not matched");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: newPassword },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      throw createError(400, "User password was not updated successfully");
    }

    return updatedUser;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid Id");
    }
    throw error;
  }
};

// forget password
const handleForgetPasswordByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw createError(
        404,
        "Email is incorrect or you have not verified your email address. please register first"
      );
    }
    // create json web token
    const token = createJSONWebToken({ email }, JwtResetPasswordKey, "10m");

    // prepare email
    const emailData = {
      email,
      subject: "Reset Password Email",
      html: `
        <h2>Hello ${user.name}</h2>
        <p>Please click here to <a href="${clientURL}/api/users/reset-password/${token}"target="_blank"> Reset Your Password</a></p>`,
    };

    // send email with node mailer
    try {
      await sendEmailWithNodeMailer(emailData);
      return token;
    } catch (emailError) {
      next(createError(500, "failed to send Reset Password email"));
      return;
    }
  } catch (error) {
    throw error;
  }
};

// reset password
const handleResetPasswordByToken = async (token, password) => {
  try {
    const decoded = jwt.verify(token, JwtResetPasswordKey);
    if (!decoded) {
      throw createError(400, "Invalid token or Expired token");
    }

    const filter = { email: decoded.email };
    const update = { password: password };
    const options = { new: true };
    const updatedUser = await User.findOneAndUpdate(
      filter,
      update,
      options
    ).select("-password");

    if (!updatedUser) {
      throw createError(400, "Password reset failed");
    }
  } catch (error) {
    console.log(error.message)
    if (error.message == "jwt malformed") {
    throw createError(
      400,
      "Your action is wrong. Please take the correct procedure"
    );
    }
    throw error;
  }
};

// manege isBanned and isUnBanned
const handleUserAction = async (userId, action) => {
  try {
    let update;
    let successMessage;
    if (action === "banned") {
      update = { isBanned: true };
      successMessage = "User was banned Successfully";
    } else if (action === "unbanned") {
      update = { isBanned: false };
      successMessage = "User was Unbanned Successfully";
    } else {
      throw createError(4000, "Invalid Action. use Banned or Unbanned");
    }

    const updateOptions = { new: true, runValidators: true, context: "query" };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      updateOptions
    ).select("-password");

    if (!updatedUser) {
      throw createError(400, `User was not ${action} successfully`);
    }
    return { updatedUser, successMessage };
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(400, "Invalid Id");
    }
    throw error;
  }
};

module.exports = {
  handleUserAction,
  handleFindUsers,
  handleFindUserById,
  handleDeleteUserById,
  handleUpdateUserById,
  handleUpdateUserPasswordById,
  handleForgetPasswordByEmail,
  handleResetPasswordByToken,
};
