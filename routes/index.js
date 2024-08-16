const router = require("express").Router();
const googleAuthRoutes = require("./googleAuth");
const apiRoutes = require("./api");

router.use("/auth", googleAuthRoutes);
router.use("/api", apiRoutes);

router.use("/api", (req, res) =>
  res.status(404).json("No route for this path")
);

module.exports = router;
