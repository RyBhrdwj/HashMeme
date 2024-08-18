const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const secretOrKey = process.env.JWT_SECRET;
const AUTH_REDIRECT = process.env.AUTH_REDIRECT;

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
    failureRedirect: "http://localhost:5173/auth",
    session: false,
  }),
  (req, res) => {
    if (!req.user) {
      return res.redirect("http://localhost:5173/auth");
    }

    const token = jwt.sign(
      { id: req.user._id, username: req.user.username },
      secretOrKey,
      { expiresIn: "20d", algorithm: "HS256" }
    );

    console.log("GoogleAuth : ", token);

    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "Lax",
    });

    res.redirect(AUTH_REDIRECT);
  }
);

module.exports = router;
