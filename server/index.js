require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
require("./services/googleStrategy");

const app = express();

const PORT = process.env.PORT || 3000;
const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL_PROD
    : process.env.CLIENT_URL_DEV;

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/", routes);

app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected");
  });
  console.log(`Server is running on port ${PORT}`);
});
