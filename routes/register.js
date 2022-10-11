const { db } = require("../util/admin");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doc = require("firebase/firestore");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    // get user input
    const { username, password, date, name } = req.body;

    // validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exists
    const oldUserRef = await db.collection("Users").doc(username);

    let documentData = null;

    await oldUserRef
      .get()
      .then((doc) => {
        documentData = doc.data();
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    if (documentData) {
      return res.status(409).send("User already exists. Please login");
    }

    // encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // create new user in database
    const userRef = await db.collection("Users").doc(username).set({
      username: username,
      password: encryptedPassword,
      date: date,
      name: name,
    });

    // create token
    const token = jwt.sign(
      { user_id: userRef.id, username, name },
      process.env.JWT_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    const user = {
      username: username,
      password: encryptedPassword,
      date: date,
      name: name,
      token: token,
    };

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
