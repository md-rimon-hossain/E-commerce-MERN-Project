const multer = require("multer");

const {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
  UPLOAD_USERS_IMG_DIRECTORY,
  UPLOAD_PRODUCT_IMG_DIRECTORY,
} = require("../config");

// // Upload User file using string
const userStorage = multer.diskStorage({
  
  // when my own server use upload image 
  // destination: (req, file, cb) => {
  //   cb(null, UPLOAD_USERS_IMG_DIRECTORY);
  // },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// // Upload product file using string
const productStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, UPLOAD_PRODUCT_IMG_DIRECTORY);
  // },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error("File type is not allowed"), false);
  }
  cb(null, true);
};

const uploadUserImage = multer({
  storage: userStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});


const uploadProductImage = multer({
  storage: productStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = {uploadUserImage, uploadProductImage};
