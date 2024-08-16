const router = require("express").Router();
const googleAuthRoutes = require("./googleAuth");
const apiRoutes = require("./api");
const requireJwtAuth = require("../middlewares/requireJwtAuth");

router.use("/auth", googleAuthRoutes);
router.use("/api", apiRoutes);

router.get("/api/protected", requireJwtAuth, (req, res) => {
  res.json(req.user).redirect("localhost:5173/me");
});


router.use("/api", (req, res) =>
  res.status(404).json("No route for this path")
);

module.exports = router;
