const router = require("express").Router();
const posts = require("../../controllers/postController");

router.get("/", posts.getAllPosts);
router.get("/hot", posts.getMostLikedPosts);
router.get("/recent", posts.getRecentPosts);
router.get("/:id", posts.getOnePost);
router.get("/user/:id", posts.getPostsByUserId);

router.post("/", posts.createPost);
router.delete("/:id", posts.deletePost);

router.post("/:id/like", posts.postLike);
router.delete("/:id/like", posts.deleteLike);

module.exports = router;
