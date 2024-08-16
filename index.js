require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
require("./services/googleStrategy");
require("./services/jwtStrategy");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/", routes);

// Test Routes to be removed later
app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Signup with google</a>");
});

app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected");
  });
  console.log(`Server is running on port ${PORT}`);
});
