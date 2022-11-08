const passport = require('passport');


/**
 * pass only if you are authorized(Default=true for now)
 * if not, send 401 unauthorized
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function auth(req,res,next){
    let isAuthorized=true

    /**
     * TODO
     * check if user is authorized for the action using cookie,session,etc
     */

    if(isAuthorized){
        //move on to the next middleware
        next()
    }
    else{
        res.status(401).end()
    }
}




const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const KEY="TOP_SECRET";

passport.use(
  new JWTstrategy(
    {
      secretOrKey: KEY,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);


const jwtAuth=passport.authenticate('jwt', { session: false })



module.exports={
    auth,jwtAuth
}