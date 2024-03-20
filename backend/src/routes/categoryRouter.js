const categoryRouter = require("express").Router();

const { runValidation } = require("../validators");
const uploadUserImage = require("../middlewares/uploadFile");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth");

// all routes here
const {
  getCategories,
  createCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { validateCategory } = require("../validators/category");

// GET: /api/categories --> get All Categories
categoryRouter.get("/", getCategories);
categoryRouter.get("/:slug", getSingleCategory);

// post: /api/categories --> Create categories
categoryRouter.post(
  "/",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  createCategories
);

categoryRouter.put(
  "/:slug",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  updateCategory
);

categoryRouter.delete(
  "/:slug",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  deleteCategory
);
module.exports = categoryRouter;
