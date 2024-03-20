require("dotenv").config();

const serverPort = process.env.PORT || 4000;

const mongodbAtlasURL =
  process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerceMernDB";

const defaultUserImagePath =
  process.env.DEFAULT_USER_IMAGE_PATH || "public/images/users/default.jpg";

const defaultProductImagePath =
  process.env.DEFAULT_PRODUCT_IMAGE_PATH || "public/images/products/default.jpg";

const jwtActivationKey =
  process.env.JWT_ACTIVATION_KEY || "fidlsfy8urhenfri_23114123";

const jwtAccessKey =
  process.env.JWT_ACCESS_KEY || "fidlsfy8urhfdsenfri_23114123";

const JwtRefreshKey = process.env.JWT_REFRESH_KEY || "refreshTokenKey_jwt12345";

const JwtResetPasswordKey =
  process.env.JWT_RESET_PASSWORD_KEY || "resetPasswordKeyfs";

const smtpUsername = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const clientURL = process.env.CLIENT_URL;

module.exports = {
  serverPort,
  mongodbAtlasURL,
  defaultUserImagePath,
  defaultProductImagePath,
  jwtActivationKey,
  smtpUsername,
  smtpPassword,
  clientURL,
  jwtAccessKey,
  JwtResetPasswordKey,
  JwtRefreshKey,
};
