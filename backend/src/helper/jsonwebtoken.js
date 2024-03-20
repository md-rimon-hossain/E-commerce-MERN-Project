const jwt = require("jsonwebtoken");
const logger = require("../controllers/loggerController");


const createJSONWebToken = (payload, secretKey, expiresIn) => {

    if(typeof payload !== "object" || !payload){
        throw new Error("payload must be a non-empty object")
    }

    if(typeof secretKey !== "string" || secretKey === ""){
        throw new Error("secret key must be a non-empty String")
    }

  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
  return token
  } catch (error) {
    logger.log("error",`failed to sing in JWT`,)
    throw error
  }
};

module.exports = {
  createJSONWebToken,
};
