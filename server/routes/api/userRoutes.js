const router = require("express").Router();
const users = require("../../controllers/userController");
const requireJwtAuth = require("../../middlewares/requireJwtAuth");

/*
    User Routes (/user)

    Sign up with google /signup
    Sign in with google /signin 
    Sign out            /signout

    [middleware]
    Refresh token       /refreshToken
    (Auto trigger after receiving 401)
    
    Change username     /username/[username]
    (triggered after successful signup)
*/

router.get("/:id", users.getUser);
router.put("/:id/username", requireJwtAuth, users.changeUsername);

module.exports = router;
