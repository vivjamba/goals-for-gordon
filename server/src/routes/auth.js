const passport = require('passport');


const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const {JWTVerify}=require("./jwtVerifier")

const KEY="goals_for_gordon_key";

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

const JWTConfigPOST={
  secretOrKey: KEY,
  jwtFromRequest: ExtractJWT.fromBodyField('token'),
  passReqToCallback: true

}
const JWTConfig={
  secretOrKey: KEY,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('token'),
  passReqToCallback: true
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjAwZDA1MjE5MjJkMzFkOGE3NGY5YiIsImVtYWlsIjoiR2VyYWxkX0N1bm5pbmdoYW1AZmx1ZmZ5YnVubnljb25zdWx0aW5nLmNvbSJ9LCJpYXQiOjE2NjgwMjg5NDd9.o43VGsjzDbFaSwU28ZuiQBmMMZehNmsw0xQl3DtJITQ


passport.use("jwt",
  new JWTstrategy(
    JWTConfig,JWTVerify
  )
)


const verifyJWT=passport.authenticate('jwt', { session: false })



module.exports={
    auth,verifyJWT
}