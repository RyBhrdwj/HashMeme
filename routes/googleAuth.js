const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

const clientUrl =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL_PROD
    : process.env.CLIENT_URL_DEV;

router.get(
  "/signup",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: "http://localhost:3000/auth",
    session: false,
  }),
  (req, res) => {
    console.log("User is authenticated");
    const token = req.user.generateJWT();
    res.cookie("x-auth-cookie", token);
    res.redirect(clientUrl);
  }
);

module.exports = router;
