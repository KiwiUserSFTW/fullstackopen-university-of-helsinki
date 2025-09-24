const mongoose = require("mongoose");

const config = require("../utils/config");

const connectBlogDb = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("connected to MongoDB");
  } catch (error) {
    console.error("error connecting to MongoDB:", error.message);
  }
};

module.exports = connectBlogDb;
