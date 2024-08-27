const mongoose = require("mongoose");

const profilePictureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageUrl: { type: String, required: true }, // URL to the uploaded image
  uploadedAt: { type: Date, default: Date.now }, // Timestamp of when the picture was uploaded
});

module.exports = mongoose.model("ProfilePicture", profilePictureSchema);
