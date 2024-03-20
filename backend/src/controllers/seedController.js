const data = require("../data");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const seedUser = async (req, res, next) => {
  try {
    // deleting all existing users
    await User.deleteMany({});

    // inserting new users
    const users = await User.insertMany(data.users);

    // response send successful users
    return res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

const seedProducts = async (req, res, next) => {
  try {
    // deleting all existing products
    await Product.deleteMany({});

    // inserting new products
    const products = await Product.insertMany(data.products)

    // response send successful users
    return res.status(201).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = { seedUser, seedProducts};
