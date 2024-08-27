const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchusers");
const ProfilePicture = require("../models/ProfilePictures");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the pp using: GET "/api/auth/getuser". Login required
router.get("/fetchAllProfilePictures", fetchuser, async (req, res) => {
  try {
    const profilePictures = await ProfilePicture.find({ userId: req.user.id });
    console.log(req.user.id, "req.user.id");
    console.log(profilePictures, "profilePictures");
    res.json(profilePictures);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new ProfilePicture using: POST "/api/profile/addProfilePicture". Login required
router.post(
  "/addProfilePicture",
  fetchuser,
  [body("imageUrl", "Enter a valid image").isLength({ min: 3 })],
  async (req, res) => {
    try {
      const { imageUrl } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const profilePicture = new ProfilePicture({
        imageUrl,
        userId: req.user.id,
      });
      const savedProfilePicture = await profilePicture.save();

      res.json(savedProfilePicture);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
