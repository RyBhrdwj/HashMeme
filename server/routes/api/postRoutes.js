const router = require("express").Router();
const posts = require("../../controllers/postController");
const upload = require("../../middlewares/multerMiddleware");
const requireJwtAuth = require("../../middlewares/requireJwtAuth");

router.get("/", posts.getAllPosts);
router.get("/hot", posts.getMostLikedPosts);
router.get("/recent", posts.getRecentPosts);
router.get("/:id", posts.getOnePost);
router.get("/user/:id", posts.getPostsByUserId);

router.post("/", requireJwtAuth, upload.single("image"), posts.createPost);
router.delete("/:id", requireJwtAuth, posts.deletePost);

router.post("/:id/like", requireJwtAuth, posts.postLike);
router.delete("/:id/like", requireJwtAuth, posts.deleteLike);

module.exports = router;
