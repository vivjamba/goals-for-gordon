const localStrategy = require('passport-local').Strategy;
const { User } = require("../index")
const passport = require('passport');
const jwt = require('jsonwebtoken');
const KEY="goals_for_gordon_key";
const { onServerError } = require("./statusHandlers")


const loginParamConfig={
  usernameField: 'email',
  passwordField: 'password'
}
//Gerald_Cunningham@fluffybunnyconsulting.com
//cunninghamge


//verify user with email and password
const loginVerify=async (email, password, done) => {
  try {
    console.log(email,password)
      const user=await User.findOne({ email: email })
      console.log(user)
      if(!user) {
          return done(null, false, { message: 'User not found' });
      }
      if(user.password!==password) {
          return done(null, false, { message: 'Wrong Password' });
      }


      return done(null, user, { message: 'Logged in Successfully' }); //success
  } catch (error) {
    return done(error);
  }
}

//a "strategy" for login authorization
passport.use(
    'login',
    new localStrategy(
      loginParamConfig,
      loginVerify
    )
  );



//controller function for login
//uses "login" strategy defined above
async function loginController(req, res, next){
  passport.authenticate(
    'login',
    async (err, user, info) => {
      console.log(user)
      try {
        if (err || !user) {
          onServerError(res,err)
          return
        }
       
        const body = { _id: user._id, email: user.email};
        const token = jwt.sign({ user: body },KEY);  //create jwt

          return res.json({ token }); //send signed jwt to client

      } catch (error) {
        onServerError(res,err)
        return
      }
    }
  )(req, res, next);
}
module.exports={
    loginController
}