const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/userprofilemanager";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
