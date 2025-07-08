require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.log("MongoDB Error : ", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
