const slugify = require('slugify')

const Category = require('../models/categoryModel');
const { successResponseHandler } = require("./responseController");
const {handleCreateCategories, handleGetCategories, handleGetSingleCategory, handleUpdateCategory, handleDeleteCategory} = require('../services/categoryService');

// GET all Categories
const getCategories = async (req, res, next) => {
    try {
      const categories = await handleGetCategories()
      return successResponseHandler(res, {
        statusCode: 200,
        message: "categories ware return successfully",
        payload: {categories},
      });
    } catch (error) {
      next(error);
    }
};

// GET all Categories
const getSingleCategory = async (req, res, next) => {
    try {
      const slug = req.params.slug
      const category = await handleGetSingleCategory(slug)

      return successResponseHandler(res, {
        statusCode: 200,
        message: "Single category ware return successfully",
        payload: {category},
      });
    } catch (error) {
      next(error);
    }
};

// create Category
const createCategories = async (req, res, next) => {
    try {
      const { name } = req.body
      const newCategory = await handleCreateCategories(name)
      

      return successResponseHandler(res, {
        statusCode: 201,
        message: "category was created successfully",
        payload: {newCategory},
      });
    } catch (error) {
      next(error);
    }
};

// create Category
const updateCategory = async (req, res, next) => {
    try {
      const slug= req.params.slug
      const { name } = req.body
      const updatedCategory = await handleUpdateCategory(slug, name)
      

      return successResponseHandler(res, {
        statusCode: 200,
        message: "category  Updated successfully",
        payload: {updatedCategory},
      });
    } catch (error) {
      next(error);
    }
};

// create Category
const deleteCategory = async (req, res, next) => {
    try {
      const slug= req.params.slug
      const deletedCategory = await handleDeleteCategory(slug)
      

      return successResponseHandler(res, {
        statusCode: 200,
        message: "category was  deleted successfully",
        payload: deletedCategory,
      });
    } catch (error) {
      next(error);
    }
};

module.exports = {getCategories,getSingleCategory, createCategories,updateCategory,deleteCategory };
