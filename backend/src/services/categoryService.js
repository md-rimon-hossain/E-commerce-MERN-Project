const createError = require("http-errors");
const slugify = require("slugify");

const Category = require("../models/categoryModel");

// get All categories service
const handleGetCategories = async () => {
  try {
    return await Category.find({}).select("name slug").lean();
  } catch (error) {
    throw createError(404, "Categories not Found");
  }
};

// get Single category by slug
const handleGetSingleCategory = async (slug) => {
  try {
    const singleCategory =   await Category.findOne({ slug }).select("name slug").lean();
    if(!singleCategory){
        throw createError(404,"No category found with this Slug")
    }
    return singleCategory
  } catch (error) {
    throw createError(404, "Category not Found");
  }
};

// Update category by slug
const handleUpdateCategory = async (slug, name) => {
  try {
    const filter = { slug: slug };
    const update = { $set: { name: name, slug: slugify(name) } };
    const options = { new: true };
    const updatedCategory = await Category.findOneAndUpdate(filter,update,options);

    if(!updatedCategory){
        throw createError(404,"No category found with this Slug")
    }

    return updatedCategory;
  } catch (error) {
    throw createError(404, "Category was not Found and not update");
  }
};

// delete category service
const handleDeleteCategory = async (slug) => {
      const deletedCategory = await Category.findOneAndDelete({slug})
      console.log(deletedCategory)
      if(!deletedCategory){
        throw createError(404, "Category not found  with this slug")
      }
      return deletedCategory
  };

// create categories
const handleCreateCategories = async (name) => {
  try {
    console.log(name);
    const newCategory = await Category.create({
      name: name,
      slug: slugify(name),
    });
    return newCategory;
  } catch (error) {
    throw createError(404, `Category was not created successfully. ${error}`);
  }
};

module.exports = {
  handleGetCategories,
  handleGetSingleCategory,
  handleCreateCategories,
  handleUpdateCategory,
  handleDeleteCategory
};
