const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const secretOrKey = process.env.JWT_SECRET;

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Handles Google OAuth callback
router.get(
  "/signup",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: "http://localhost:3000/auth",
    session: false,
  }),
  async (req, res) => {
    try {
      console.log("User in signup route:", req.user);
      // Generate JWT token
      const token = jwt.sign({ id: req.user._id }, secretOrKey, {
        expiresIn: "1h",
      });

      console.log(token);

      // Send token to client via cookie
      res.cookie("x-auth-cookie", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      // Redirect to client URL
      const clientUrl =
        process.env.NODE_ENV === "production"
          ? process.env.CLIENT_URL_PROD
          : process.env.CLIENT_URL_DEV;

      res.redirect(clientUrl);
    } catch (error) {
      console.error("Error in OAuth callback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
