var express = require("express");
var app = express();
var cors = require("cors");
const PORT = process.env.PORT || 5050;
const auth = require("./middleware/auth");

const { users } = require("./models/users");
const { register } = require("./routes/register");
const { login } = require("./routes/login");
const { create_bill } = require("./routes/create-bill");
const { bills } = require("./routes/bills");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome homepage
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome");
});

/// Get users
app.get("/users", users);

// Register
app.post("/register", register);

// Login
app.post("/login", login);

// Create bill
app.post("/create-bill", create_bill);

// Get bills
app.get("/bills", bills);

app.get("/", (req, res) => {
  res.send("This is my demo project");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}!`);
});
