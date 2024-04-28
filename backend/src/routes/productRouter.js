const productRouter = require("express").Router();

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
} = require("../controllers/productController");

const { runValidation } = require("../validators");

const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const { validateProduct } = require("../validators/product");
const { uploadProductImage } = require("../middlewares/uploadFile");

productRouter.post(
  "/",
  uploadProductImage.single("image"),
  validateProduct,
  runValidation,
  isLoggedIn,
  isAdmin,
  createProduct
);
// get all products
productRouter.get("/", getAllProducts);

// get single product
productRouter.get("/:slug", getSingleProduct);

// delete single product
productRouter.delete("/:slug", isLoggedIn, isAdmin, deleteSingleProduct);

// delete single product
productRouter.put(
  "/:slug",
  isLoggedIn,
  isAdmin,
  uploadProductImage.single("image"),
  updateSingleProduct
);

module.exports = productRouter;
