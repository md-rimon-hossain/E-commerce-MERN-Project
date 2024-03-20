const { validationResult } = require("express-validator");
const { errorResponseHandler } = require("../controllers/responseController");

const runValidation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorResponseHandler(res, {
        statusCode: 422,
        message: errors.array()[0].msg,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { runValidation };
