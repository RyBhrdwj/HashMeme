const PostRepository = require("../repositories/PostRepository");
const LikeRepository = require("../repositories/LikeRepository");
const uploadFileToS3 = require("../utils/s3Util");

class PostController {
  constructor() {
    this.post = new PostRepository();
    this.like = new LikeRepository();
  }

  getAllPosts = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4; 
      
      const posts = await this.post.readAll(page, limit);

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
      const postData = {};

      postData.author = req.user.id;

      const s3Response = await uploadFileToS3(req.file);
      postData.imageUrl = s3Response.Location;

      const newPost = await this.post.create(postData);

      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await this.post.deletePost(id, userId);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  postLike = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

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
      const userId = req.user.id;

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
