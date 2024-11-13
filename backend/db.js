const mongoose = require("mongoose");

const url = `mongodb+srv://jawadali:jawadali7898@products.3hime.mongodb.net/Product?retryWrites=true&w=majority&appName=Products`;

const connection_db = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connection_db;