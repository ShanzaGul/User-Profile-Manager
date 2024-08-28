const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const ProfilePicture = require("../models/ProfilePictures");
const path = require("path");

let projectId = "";
let keyFilename = "";

let storage = new Storage({
  projectId,
  keyFilename,
});

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const bucket = storage.bucket("");

const { body, validationResult } = require("express-validator");
const jwt_secret = "";

const fetchUser = require("../middleware/fetchusers");

//Create a user using: POST "/api/auth". No login required
router.post(
  "/",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Minimum password length is 8").isLength({ min: 8 }),
    body("fullName", "Enter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    const { fullName, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // add a try and catch block for creating a user
    try {
      const newUser = new User({
        fullName,
        email,
        passwordHash,
      });

      const data = {
        user: {
          id: newUser.id,
        },
      };

      const authToken = jwt.sign(data, jwt_secret);
      console.log(authToken);

      let result = await newUser.save();
      res.send({ authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error in Saving");
    }
  }
);

//Authenticate a user using: POST "/api/auth/login". No login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        console.log(req.body, " here");
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
      if (!passwordCorrect) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
);

//Get logged in user details using: POST "/api/auth/getuser". Login required

router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId, "userId");
    const user = await User.findById(userId).select("-passwordHash");
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// update user details using: PUT "/api/auth/updateuser". Login required

router.put(
  "/updateUser",
  fetchUser,
  [
    body("fullName", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("currentProfilePicture", "Enter a valid URL").isURL(),
  ],
  async (req, res) => {
    const { fullName, email, currentProfilePicture } = req.body;
    const userId = req.user.id;
    try {
      let user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User Not Found" });
      }

      //check if the email already exists
      const userExists = await User.findOne({ email }).select("-passwordHash");
      if (userExists && userExists.id !== userId) {
        return res.status(400).json({ error: "Email already exists" });
      }

      user = await User.findByIdAndUpdate(
        userId,
        { fullName, email, currentProfilePicture },
        { new: true }
      );
      res.json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// upload profile picture using: POST "/api/auth/upload". Login required

router.post(
  "/upload",
  fetchUser,
  multer.single("imgFile"),
  async (req, res) => {
    console.log("Hurrah I here");
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-passwordHash");
      if (!user) {
        return res.status(404).json({ error: "User Not Found" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Please upload a file" });
      }
      // Extract the file extension from the original file name
      const fileExtension = path.extname(req.file.originalname);

      // Create a new file name using user ID and original file name
      const newFileName = `${userId}_${Date.now()}_${path.basename(
        req.file.originalname,
        fileExtension
      )}${fileExtension}`;

      const fileInBucket = bucket.file(newFileName);
      const uploadStream = fileInBucket.createWriteStream({
        resumable: false,
      });

      uploadStream.on("error", (err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });

      uploadStream.on("finish", async () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileInBucket.name}`;
        user.currentProfilePicture = publicUrl;
        await user.save();
        // Also add this in the ProfilePicture model
        const profilePicture = new ProfilePicture({
          imageUrl: publicUrl,
          userId,
        });
        await profilePicture.save();

        res.json({ publicUrl });
      });

      uploadStream.end(req.file.buffer);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/", (req, res) => {
  res.send("its auth");
});

module.exports = router;
