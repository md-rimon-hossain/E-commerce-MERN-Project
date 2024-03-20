const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const { jwtAccessKey } = require("../secret");


const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw createError(401, "Access token not Found. Please login");
    }
    // verify access token is valid
    const decoded = jwt.verify(accessToken, jwtAccessKey);
    if (!decoded) {
      throw createError(401, "Invalid access token. Please Login again");
    }

    req.user = decoded.user;

    next();
  } catch (error) {
    next(error);
  }
};
const isLoggedOut = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      try {
        // verify access token is valid
        const decoded = jwt.verify(accessToken, jwtAccessKey);
        if (decoded) {
          throw createError(401, "User already logged in");
        }
      } catch (error) {
        throw error;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {

    // check is admin have in database
    const isAdminExistDatabase =  await User.findById(req.user._id,{password:0})
    if(!isAdminExistDatabase){
      throw createError(
        404,
        "This Admin does not exist in Database"
      )
    }
    
    if (!req.user.isAdmin) {
      throw createError(
        403,
        "Forbidden. You must be an Admin to access  this resource"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
};
