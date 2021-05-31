const passport = require('passport');
const expressSession = require('express-session');

exports.login = (req, res, next) => {
  console.log('trying to login')

  if(req.body.email, req.body.password) {
    passport.authenticate('local', function(error, user){
      if(error) {
        return res.status(500).send(error);
      }
      req.login(user, (error) => {
        if(error) {
          console.log(error)
          return res.status(500).send(error);
        }
        res.status(200).send(user.lastName);
      });
    })(req, res, next);
    
  } else {
    return res.status(500).send('Email and password needed!');
  }
};

exports.logout = (req, res, next) => {
  console.log('trying to log out')
  req.logout();
  req.user=null
  return res.status(200).send('User has been log out!');
};
