const { Schema, model } = require("mongoose");
const { defaultProductImagePath } = require("../secret");

// name, slug, description, price, quantity, sold, shipping, image, category Id
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "The length of Product name can be minimum 3 characters"],
      maxlength: [
        150,
        "The length of Product name can be maximum 150 characters",
      ],
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Product description is required"],
      minlength: [
        3,
        "The length of Product description can be minimum 3 characters",
      ],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Product price is required"],
      validate: {
        validator: (v) => v > 0,
        message: (props) =>
          `${props} is not a valid price. price must be greater then 0`,
      },
    },
    originalPrice: {
      type: Number,
      trim: true,
      required: [true, "Product price is required"],
      validate: {
        validator: (v) => v > 0,
        message: (props) =>
          `${props} is not a valid price. price must be greater then 0`,
      },
    },
    discount: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: [true, "Product slug is required"],
    },
    size: {
      type: String,
      required: [true, "Product slug is required"],
      uppercase: true,
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, "Product quantity is required"],
      validate: {
        validator: (v) => v > 0,
        message: (props) =>
          `${props} is not a valid quantity. quantity must be greater then 0`,
      },
    },
    sold: {
      type: Number,
      trim: true,
      required: [true, "Product sold is required"],
      default: 0,
      //   validate: {
      //     validator: (v) => v > 0,
      //     message: (props) =>
      //       `${props} is not a valid sold quantity. sold must be greater then 0`,
      //   },
    },
    shipping: {
      type: Number,
      default: 0, // shipping free then 0 , or something amount
    },
    image: {
      type: String,
      // contentType: String,
      required: [true, "Product image is required"],
      default: defaultProductImagePath,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;
