// routes/cart.js

const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const { successResponseHandler } = require("../controllers/responseController");
const createHttpError = require("http-errors");

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Find the cart associated with the user
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      throw createHttpError(404, "Cart not found");
    }

    return successResponseHandler(res, {
      statusCode: 200,
      message: "Get Cart Products successfully",
      payload: cart,
    });
  } catch (error) {
    next(error);
  }
});

// Create a new cart for a user
router.post("/", async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the user and product exist
    const user = await User.findById(userId);
    const product = await Product.findById(productId);


    if (!user || !product) {
      throw createHttpError(400, "User or product not found");
    }

    const existCart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!existCart) {
      // Create a new cart and add the item
      const cartItem = {
        product: product._id,
        quantity: quantity || 1, // Default quantity is 1 if not specified
      };

      // Create a new cart item
      const newCart = await Cart.create({
        user: userId,
        items: [cartItem],
      });
      await newCart.populate("items.product");
      return successResponseHandler(res, {
        statusCode: 200,
        message: "Cart create successfully",
        payload: newCart,
      });
    }

    // Find the index of the item to update in the items array
    const itemIndex = existCart.items.findIndex(
      (item) => item.product._id.toString() === productId
    );

    let updatedCart;
    if (itemIndex === -1) {
      // Create a new cart item
      const newItem = {
        product: product._id,
        quantity: quantity || 1, // Default quantity is 1 if not specified
      };
      existCart.items.push(newItem);
      updatedCart = await existCart.save();
      await updatedCart.populate("items.product");

      return successResponseHandler(res, {
        statusCode: 200,
        message: "new Cart item added",
        payload: updatedCart,
      });
    }

    if (quantity === -1) {
      existCart.items[itemIndex].quantity = --existCart.items[itemIndex]
        .quantity;
    } else {
      existCart.items[itemIndex].quantity = ++existCart.items[itemIndex]
        .quantity;
    }

    // Update the quantity of the item

    updatedCart = await existCart.save();

    return successResponseHandler(res, {
      statusCode: 200,
      message: "Cart quantity added successfully",
      payload: updatedCart,
    });
  } catch (error) {
    next(error)
  }
});

// Delete a cart item from the user's cart
router.delete("/:cartId/items/:itemId", async (req, res,next) => {
  try {
    const { cartId, itemId } = req.params;
    const cart = await Cart.findById({ _id: cartId });

    if (!cart) {
      throw createHttpError(400, "Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      throw createHttpError(400, "Cart item not found");
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    await cart.populate("items.product")

    return successResponseHandler(res, {
      statusCode: 200,
      message: "Cart item deleted successfully",
      payload: cart,
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
