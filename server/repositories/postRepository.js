const mongoose = require("mongoose");
const Post = require("../models/postModel");
const crudRepository = require("./crudRepository");

class postRepository extends crudRepository {
  constructor() {
    super(Post);
  }

  addLike = async (postId, userId) => {
    try {
      return await this.model.findOneAndUpdate(
        { _id: postId, likes: { $ne: userId } }, // Ensure user hasn't liked the post already
        { $push: { likes: userId } }, // Add userId to the likes array
        { new: true } // Return the updated document
      );
    } catch (error) {
      console.error("Repository Err:", error);
      throw error;
    }
  };

  removeLike = async (postId, userId) => {
    try {
      return await this.model.findOneAndUpdate(
        { _id: postId, likes: userId }, // Ensure user has liked the post
        { $pull: { likes: userId } }, // Remove userId from the likes array
        { new: true } // Return the updated document
      );
    } catch (error) {
      console.error("Repository Err:", error);
      throw error;
    }
  };

  async destroyWithSession(postId, session) {
    return this.post.deleteOne({ _id: postId }).session(session);
  }

  async findPostById(postId) {
    return this.post.findById(postId);
  }

  async deletePost(postId, userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const post = await this.findById(postId);

      if (!post) throw new Error("Post not found");
      if (post.author.toString() !== userId)
        throw new Error("Unauthorized : User is not the author of the post");

      await this.destroyWithSession(postId, session);

      await session.commitTransaction();
      return { success: true, message: "Post deleted successfully" };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  getPostsByUserId = async (userId) => {
    try {
      return await this.model
        .find({ author: userId })
        .populate("author", "username email");
    } catch (error) {
      console.error("Repository Err:", error);
      throw error;
    }
  };

  getRecentPosts = async (limit = 10) => {
    try {
      return await this.model
        .find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("author", "username email");
    } catch (error) {
      console.error("Repository Err:", error);
      throw error;
    }
  };

  getMostLikedPosts = async (limit = 10) => {
    try {
      return await this.model
        .find({})
        .sort({ likes: -1 })
        .limit(limit)
        .populate("author", "username email");
    } catch (error) {
      console.error("Repository Err:", error);
      throw error;
    }
  };
}

module.exports = postRepository;
