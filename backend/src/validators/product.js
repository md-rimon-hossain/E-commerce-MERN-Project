const { body } = require("express-validator");

// registration validation
const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product Name is Required. Enter Product name")
    .isLength({ min: 3, max:150})
    .withMessage("Product Name minimum length should be between 3 - 150 characters long"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product Description is required")
    .isLength({ min: 3})
    .withMessage("Product description minimum length should be 3 characters long"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0})
    .withMessage("Price must be a Positive Number"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({min:1})
    .withMessage("Quantity must be a positive Integer")

]


module.exports = {
    validateProduct,
};



