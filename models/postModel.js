const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
