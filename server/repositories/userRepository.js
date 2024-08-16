const User = require("../models/userModel");
const crudRepository = require("./crudRepository");

class UserRepository extends crudRepository {
  constructor() {
    super(User);
  }

  async findOrCreateUser(profile) {
    try {
      const user = await this.readOneByField("googleId", profile.id);

      if (user) {
        return user;
      } else {
        const newUser = await this.create({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.email,
        });

        return newUser;
      }
    } catch (error) {
      console.log("repo error: " + error);
      throw error;
    }
  }

  async readOneByField(field, value) {
    try {
      const doc = await this.model.findOne({ [field]: value });
      return doc;
    } catch (error) {
      console.log("repo error: " + error);
      throw error;
    }
  }
}

module.exports = UserRepository;
