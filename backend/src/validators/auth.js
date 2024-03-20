const { body } = require("express-validator");

// registration validation
const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is Required. Enter Your name")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be between 3 and 31 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is Required. Enter Your email")
    .isEmail()
    .withMessage("Invalid Email"),
  body("password")
    .notEmpty()
    .withMessage("password is Required. Enter password")
    .isLength({ min: 6 })
    .withMessage("Password should be minimum 6 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/
    )
    .withMessage(
      "Password should contain at least one uppercase letter, one lowercase letter, one number ,and one special character"
    ),
  body("address")
    .trim()
    .optional()
    // .notEmpty()
    // .withMessage("Address is Required. Enter Your Address")
    .isLength({ min: 3 })
    .withMessage("Password should be minimum 3 characters long"),
  body("phone").trim()
  .optional(),
  // .notEmpty().
  // withMessage("Phone is Required. Enter Your Phone"),
  body("image").optional().isString().withMessage("User image is optional")
];

// validation for login from 
const validateUserLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is Required. Enter Your email")
    .isEmail()
    .withMessage("Invalid Email"),
  body("password")
    .notEmpty()
    .withMessage("password is Required. Enter password")
    .isLength({ min: 6 })
    .withMessage("Password should be minimum 6 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/
    )
    .withMessage(
      "Password should contain at least one uppercase letter, one lowercase letter, one number ,and one special character"
    ),
];

// validation for update password
const validateUserUpdatePassword = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is Required. Enter Your email")
    .isEmail()
    .withMessage("Invalid Email"),
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password is Required. Enter Old password")
    .isLength({ min: 6 })
    .withMessage("Old Password should be minimum 6 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/
    )
    .withMessage(
      "Password should contain at least one uppercase letter, one lowercase letter, one number ,and one special character"
    ),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is Required. Enter New password")
    .isLength({ min: 6 })
    .withMessage("New Password should be minimum 6 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/
    )
    .withMessage(
      "Password should contain at least one uppercase letter, one lowercase letter, one number ,and one special character"
    ),
  body("confirmedPassword")
      .custom((value, {req})=> {
        if(!(value === req.body.newPassword)){
          throw new Error("confirmed Password did not match")
        }
        return true
      })
];

// validation for update password
const validateUserForgetPassword = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is Required. Enter Your email")
    .isEmail()
    .withMessage("Invalid Email"),
];

// validation for update password
const validateUserResetPassword = [
  body("token")
    .trim()
    .notEmpty()
    .withMessage("Token is missing"),
  body("password")
    .notEmpty()
    .withMessage("password is Required. Enter password")
    .isLength({ min: 6 })
    .withMessage("Password should be minimum 6 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/
    )
    .withMessage(
      "Password should contain at least one uppercase letter, one lowercase letter, one number ,and one special character"
    ),
];


module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdatePassword,
  validateUserForgetPassword,
  validateUserResetPassword,
};



