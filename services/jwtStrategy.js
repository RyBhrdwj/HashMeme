const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const JwtStrategy = Strategy;

const User = require("../models/userModel");

const secretOrKey = process.env.JWT_SECRET;

const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader("x-auth-token"),
    secretOrKey,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.id);

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  }
);

passport.use(jwtLogin);
