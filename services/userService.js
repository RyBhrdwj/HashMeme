const UserRepository = require("../repositories/userRepository");

class UserService {
  constructor() {
    if (!UserService.instance) {
      this.user = new UserRepository();

      UserService.instance = this;
    }

    return UserService.instance;
  }

  async findOrCreateUser(profile) {
    try {
      let user = await this.user.readOneByField("googleId", profile.id);

      if (!user) {
        user = await this.user.create({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.email,
        });
      }

      console.log(user);

      return user;
    } catch (error) {
      console.log("Service Error : " + error);
      throw error;
    }
  }
}

module.exports = UserService;
