const slugify = require("slugify");
const createError = require("http-errors");

const { successResponseHandler } = require("./responseController");
const Product = require("../models/productModel");
const { deleteImage } = require("../helper/deleteImage");

//all product service 
const {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetSingleProductBySlug,
  handleDeleteSingleProductBySlug,
  handleUpdateSingleProductBySlug,
} = require("../services/productService");

// create a Product
const createProduct = async (req, res, next) => {
  try {
    const product = await handleCreateProduct(req);

    return successResponseHandler(res, {
      statusCode: 201,
      message: "Product create was successfully",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

// get all Products
const getAllProducts = async (req, res, next) => {
  try {
    const search = req.query.search || ""
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const { products, pagination } = await handleGetAllProducts(search,page, limit);

    return successResponseHandler(res, {
      statusCode: 200,
      message: "Return all the Products",
      payload: {
        products,
        pagination,
      },
    });
  } catch (error) {
    next(error);
  }
};

// get single product
const getSingleProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await handleGetSingleProductBySlug(slug);

    return successResponseHandler(res, {
      statusCode: 200,
      message: "Return a single Product",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};

// get single product
const deleteSingleProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    await handleDeleteSingleProductBySlug(slug);

    return successResponseHandler(res, {
      statusCode: 200,
      message: "deleted single product successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

// update User By id
const updateSingleProduct = async (req,res,next) => {
  try {
    const { slug } = req.params;
    const updatedProduct = await handleUpdateSingleProductBySlug(slug,req)

    return successResponseHandler(res, {
      statusCode: 200,
      message: "single product was updated successfully",
      payload: {updatedProduct},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
