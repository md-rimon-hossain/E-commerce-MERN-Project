const createError = require("http-errors");
const slugify = require("slugify");
const Product = require("../models/productModel");
const { deleteImage } = require("../helper/deleteImage");

const  cloudinary = require("../config/cloudinary");
const { publicIdWithoutExtension } = require("../helper/cludinaryHelper");

// Product create service
const handleCreateProduct = async (req) => {
  const { name, description, price, sold, quantity, shipping, category } =
    req.body;

  let image = req.file?.path;

  // image maximum size 2mb
  if (image && image.size > 2097152) {
    throw createError(
      400,
      "image file is too large. it must be less than 2 MB"
    );
  }

  const productExist = await Product.exists({ name: name });
  if (productExist) {
    throw createError(409, "Product already exists with this name.");
  }

  // cloudinary upload image 
  // const image = decoded.image;
  if (image) {
    const response = await cloudinary.uploader.upload(image, {
      folder: "ecommerceMern/products",
    });
    image = response.secure_url;
  }

  const product = await Product.create({
    name: name,
    slug: slugify(name),
    description: description,
    price: price,
    sold: sold,
    quantity: quantity,
    shipping: shipping,
    image: image,
    category: category,
  });

  return product;
};

// all products get service
const handleGetAllProducts = async (search,page, limit) => {

  const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      $or: [
        { name: { $regex: searchRegExp } },
      ],
    };

  const products = await Product.find(filter)
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  if (!products) {
    throw createError(404, "Products not Found");
  }
  const count = await Product.find(filter).countDocuments();

  const pagination = {
    totalProducts: count,
    totalPages: Math.ceil(count / limit),
    previousPage: page - 1,
    currentPage: page,
    nextPage: page + 1,
  };

  return {
    products,
    pagination,
  };
};

// single product get service
const handleGetSingleProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug }).populate("category");
  if (!product) {
    throw createError(404, "No Product found");
  }
  return product;
};

// single product delete service
const handleDeleteSingleProductBySlug = async (slug) => {

  const existingProduct = await Product.findOne({slug});

    if (!existingProduct) {
      throw createError(404, `Product does not exist with this slug`);
    }

    if(existingProduct && existingProduct.image){
      if (!(existingUser.image === "./public/images/products/default.jpg")) {
        const publicId = await publicIdWithoutExtension(existingProduct.image);
        const { result } = await cloudinary.uploader.destroy(
          `ecommerceMern/products/${publicId}`
        );
        if (result !== "ok") {
          throw new Error(
            "Product image was not deleted successfully from cloudinary. Please try again"
          );
        }
      }
      
    }


  const product = await Product.findOneAndDelete({ slug: slug });

  if (!product) {
    throw createError(404, "No Product found");
  }

  // find image path and delete
  // const userImagePath = product?.image;
  // userImagePath !== "./public/images/products/default.jpg" &&
  //   deleteImage(userImagePath);
  
};

// single product update service
const handleUpdateSingleProductBySlug = async (slug, req) => {
  const product = await Product.findOne({ slug });

  if(!product){
    throw createError(404, "Product not found")
  }

  const updateOptions = { new: true, runValidators: true, context: "query" };
  let updatesProductValue = {};

  const updateAllowedField = [
    "name",
    "slug",
    "description",
    "sold",
    "quantity",
    "price",
    "shipping",
  ];

  // name, slug, description, sold, quantity, price shipping
  for (const key in req.body) {
    if (updateAllowedField.includes(key)) {
      updatesProductValue[key] = req.body[key];
    }
    //  else if (key === "email") {
    //   throw createError(400, "Email can not be Updated");
    // }
  }

  if (updatesProductValue.name) {
    updatesProductValue.slug = slugify(updatesProductValue.name);
  }

  // update image and delete existing image
  const image = req.file?.path;
  if (image) {
    // image maximum size 2mb
    if (image.size > 2097152) {
      throw createError(
        400,
        "image file is too large. it must be less than 2 MB"
      );
    }
    //*** when store image my own server ***/
    // updatesProductValue.image = image;
    // product.image !== "./public/images/products/default.png" &&
    //   deleteImage(product.image);

    const response = await cloudinary.uploader.upload(image, {
      folder: "ecommerceMern/products",
    });
    updatesProductValue.image = response.secure_url;
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { slug },
    updatesProductValue,
    updateOptions
  );

  if (!updatedProduct) {
    throw createError(404, "Product with this slug does not exist");
  }

  // delete the previous product image from cloudinary
  if(product.image){
    const publicId = await publicIdWithoutExtension(product.image)
    const {result} = await cloudinary.uploader.destroy(`ecommerceMern/products/${publicId}`)
    if(result !== "ok"){
      throw new Error("Previous Product image was not deleted successfully from cloudinary. Please try again")
    }
  }


  return updatedProduct;
};

module.exports = {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetSingleProductBySlug,
  handleDeleteSingleProductBySlug,
  handleUpdateSingleProductBySlug,
};
