const mongoose = require("mongoose");
const Post = require("../models/postModel");
const crudRepository = require("./crudRepository");

class postRepository extends crudRepository {
  constructor() {
    super(Post);
  }

  async readAll(page = 1, limit = 4) {
    const skip = (page - 1) * limit; 

    return Post.find()
      .skip(skip)
      .limit(limit) 
      .populate("author", "username") 
      .exec();
  }

  addLike = async (postId, userId) => {
    try {
      return await this.model.findOneAndUpdate(
        { _id: postId, likes: { $ne: userId } }, // user hasn't liked the post already
        { $push: { likes: userId } }, // push user in the likes
        { new: true }
      );
    } catch (error) {
      console.error("Repository Err:", error);
      throw error;
    }
  };

  removeLike = async (postId, userId) => {
    try {
      return await this.model.findOneAndUpdate(
        { _id: postId, likes: userId }, // if user has liked post
        { $pull: { likes: userId } }, // remove the id from likes
        { new: true }
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
