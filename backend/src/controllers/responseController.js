const errorResponseHandler = (
  res,
  { statusCode = 500, message = "Internal server Error" }
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

const successResponseHandler = (
  res,
  { statusCode = 200, message = "Successful", payload = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payload,
  });
};

module.exports = {
  errorResponseHandler,
  successResponseHandler,
};
