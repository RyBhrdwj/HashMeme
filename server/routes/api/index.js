const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const upload = require("../../middlewares/multerMiddleware");
const UploadController = require("../../controllers/uploadController");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.post("/upload", upload.single("image"), UploadController.uploadImage);

module.exports = router;
