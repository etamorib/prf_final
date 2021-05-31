const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../schemas/users/user.model');

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user =  await userModel.findByEmail(email);
    if (!user) {
      return done('Bad email', false);
    }
    user.comparePassword(password, (err, isMatch) => {

      if(err) {
        return done(err, false);
      }
      if(!isMatch) {
        return done('Incorrect password!', false);
      }

      return done(null, user);
    });
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => {
    return done(null, user);
  })
}

module.exports = initialize