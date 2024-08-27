const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db/config");

connectDB();
const User = require("./models/User");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { fullName, email, passwordHash } = req.body;
  const user = new User({
    fullName,
    email,
    passwordHash,
  });
  let result = await user.save();
  res.send(result);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Available routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
