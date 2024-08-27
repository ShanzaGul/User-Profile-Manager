const jwt = require("jsonwebtoken");

//TODO: add process.env.JWT_SECRET to .env file
const jwt_secret = "jwt36rtbc7nxyx73d83fydnmxhwuecef72g[";

const fetchUser = (req, res, next) => {
  // Get the token from the header if present and take user id from it
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).send("Please authenticate using a valid token");
    }
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Please authenticate using a valid token");
  }
};

module.exports = fetchUser;
