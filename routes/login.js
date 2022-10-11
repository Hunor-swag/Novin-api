const express = require("express");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require("dotenv").config();
const router = express.Router();

const { db } = require("../util/admin");

exports.login = async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const userRef = await db.collection("Users").doc(username);
    let user = null;
    await userRef
      .get()
      .then((doc) => {
        user = doc.data();
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    if (user && (await bcrypt.compare(password, user.password))) {
      // set last login date
      let date = new Date();
      let dateString =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      await db.collection("Users").doc(username).set({
        username: user.username,
        password: user.password,
        date: user.date,
        name: user.name,
        last_login: dateString,
      });

      // Create token
      const token = await jwt.sign({ user }, process.env.JWT_KEY, {
        expiresIn: "2h",
      });

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(401).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};
