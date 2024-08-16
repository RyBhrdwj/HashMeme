const router = require("express").Router();
const googleAuthRoutes = require("./googleAuth");
const apiRoutes = require("./api");
const requireJwtAuth = require("../middlewares/requireJwtAuth");

router.use("/auth", googleAuthRoutes);
router.use("/api", apiRoutes);

router.get("/protected", requireJwtAuth, (req, res) => {
  const token = req.cookies["x-auth-cookie"];

  if (token) {
    res.json("You have accessed the protected route!");
  } else {
    res.status(401).json("Unauthorized");
  }
});

router.use("/api", (req, res) =>
  res.status(404).json("No route for this path")
);

module.exports = router;
