const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { successResponseHandler } = require("./responseController");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const { jwtAccessKey, JwtRefreshKey, jwtActivationKey } = require("../secret");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    console.log(email)
    const user = await User.findOne({ email })
    if (!user) {
      throw createError(404, "User with this email does not exist.");
    }
    
    // // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "Incorrect email or password.");
    }

    // isBanned
    if (user.isBanned) {
      throw createError(403, "You are banned. Please contact authority");
    }

    // create access token
    const accessToken = createJSONWebToken({ user }, jwtAccessKey, "30s");

    // create http cookie
    res.cookie("accessToken", accessToken, {
      // maxAge: 10 * 60 * 1000, // 10 minutes
      maxAge: 30 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // create refresh token
    const refreshToken = createJSONWebToken({ user }, JwtRefreshKey , "7d");

    // create http cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    
    const userWithoutPassword =  user.toObject()
    delete userWithoutPassword.password


    // Success response
    return successResponseHandler(res, {
      statusCode: 200,
      message: "User logged in successfully.",
      payload:  userWithoutPassword ,
    });
    
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    // clear all cookie
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Success response
    return successResponseHandler(res, {
      statusCode: 200,
      message: "User logged out successfully.",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

// use refresh token generate access token here 
const handleRefreshToken = async (req, res, next) => {
  try {
      const OldRefreshToken = req.cookies.refreshToken

      if(!OldRefreshToken){
        throw createError(401, "Invalid refresh Token Please Login Again");
      }

    // jwt verify old refresh token 
    const decodedToken = jwt.verify(OldRefreshToken, JwtRefreshKey)


    if(!decodedToken){
      throw createError(401, "Invalid refresh Token Please Login Again");
    }

    // create access token again
    const accessToken = createJSONWebToken( {user:decodedToken.user}, jwtAccessKey, "10m");

    // create http cookie
    res.cookie("accessToken", accessToken, {
      maxAge: 10 * 60 * 1000, // 10 minutes

      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const userWithoutPassword =  decodedToken.user
    delete userWithoutPassword.password

    // Success response
    return successResponseHandler(res, {
      statusCode: 200,
      message: "New access token is generated.",
      payload: userWithoutPassword,
    });
  } catch (error) {
   next(error)
  }
};

// protected route control --> check access token is verified
const handleProtectedRoute = async (req, res, next) => {
  try {
    
    const accessToken = req.cookies.accessToken

    // jwt verify old refresh token 
    const decodedToken = jwt.verify(accessToken, jwtAccessKey)

    if(!decodedToken){
      throw createError(401, "verify failed Protected route. Invalid access Token Please Login Again");
    }

    // Success response
    return successResponseHandler(res, {
      statusCode: 200,
      message: "Protected resources access Successfully. Done",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleLogin, handleLogout, handleRefreshToken,handleProtectedRoute };
