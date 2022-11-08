const localStrategy = require('passport-local').Strategy;
const { User } = require("../index")
const passport = require('passport');
const jwt = require('jsonwebtoken');


passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
            const user=await User.findOne({ email: email })
            if(!user || user.length==0) {
                return done(null, false, { message: 'User not found' });
            }
            if(user[0].password!==password) {
                return done(null, false, { message: 'Wrong Password' });
            }
            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );


async function loginController(req, res, next){
  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred.');

          return next(error);
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body },KEY);

            return res.json({ token });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}
module.exports={
    loginController
}