const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productname: { type: String, required: true },
    productprice: { type: Number, required: true },
    productdescription: { type: String, required: true },
    productcategory: { type: String, required: true },
  },
  {
    collection: "Products",
  }
);

module.exports = mongoose.model("Products", ProductSchema);