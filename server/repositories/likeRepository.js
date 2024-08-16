const crudRepository = require("./crudRepository");
const Like = require("../models/likeModel");

class LikeRepository extends crudRepository {
  constructor() {
    super(Like);
  }
}

module.exports = LikeRepository;
