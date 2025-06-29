require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB is connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed ", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
