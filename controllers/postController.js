const PostRepository = require("../repositories/PostRepository");
const LikeRepository = require("../repositories/LikeRepository");

class PostController {
  constructor() {
    this.post = new PostRepository();
    this.like = new LikeRepository();
  }

  getAllPosts = async (req, res) => {
    try {
      const posts = await this.post.readAll();

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getOnePost = async (req, res) => {
    try {
      const { id } = req.params;

      const post = await this.post.readOne(id);

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createPost = async (req, res) => {
    try {
      const postData = req.body;

      const newPost = await this.post.create(postData);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { id } = req.params;

      await this.post.destroy(id);

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  postLike = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.body.userId;

      const post = await this.post.addLike(id, userId);

      if (!post) {
        return res
          .status(400)
          .json({ error: "User has already liked this post" });
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteLike = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.body.userId;

      const post = await this.post.removeLike(id, userId);

      if (!post) {
        return res.status(400).json({ error: "User has not liked this post" });
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getPostsByUserId = async (req, res) => {
    try {
      const { id } = req.params;

      const posts = await this.post.getPostsByUserId(id);

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getRecentPosts = async (req, res) => {
    try {
      const posts = await this.post.getRecentPosts();

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getMostLikedPosts = async (req, res) => {
    try {
      const posts = await this.post.getMostLikedPosts();

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = new PostController();
