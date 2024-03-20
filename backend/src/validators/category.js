const { body } = require("express-validator");

// registration validation
const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category Name is Required. Enter Your name")
    .isLength({ min: 3})
    .withMessage(" Category Name minimum length should be 3  characters long"),
]


module.exports = {
    validateCategory,
};



