const userService = require("../services/userService");
// require("../services/authService");
// const passport = require("passport");

class UserController {
  constructor() {
    this.user = userService;
  }

  changeUsername = async (req, res) => {
    try {
      const { id } = req.params;
      const { username } = req.body;

      const updatedUser = await this.user.updateUsername(id, username);

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  findOrCreateUser = async (googleId, username, email) => {
    try {
      const userData = await this.user.findOneAndUpdate(
        { googleId }, // Query to find the user by googleId
        {
          $setOnInsert: { username, email, createdAt: new Date() },
        }, // If the user does not exist, set these fields
        {
          new: true, // Return the updated document
          upsert: true, // Create the document if it doesn't exist
        }
      );

      return userData;
    } catch (error) {
      console.error("Error in findOrCreateUser:", error);
      throw error;
    }
  };
}

module.exports = new UserController();
