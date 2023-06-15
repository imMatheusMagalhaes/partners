const passport = require("passport");
const userModel = require("../models/userModel");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    const user = await userModel.findById(payload._id);
    if (!user) return done("Usuário não encotrado", false);
    return done(null, user.toJSON());
  })
);

module.exports = passport.authenticate("jwt", { session: false });
