const passport = require('passport');


const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const {JWTVerify}=require("./jwtVerifier")

const KEY="goals_for_gordon_key"; //jwt secret key, should be put into variables.env in future
/*
/**
 * 
 * pass only if you are authorized(Default=true for now)
 * if not, send 401 unauthorized
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 *
function auth(req,res,next){
    let isAuthorized=true


    if(isAuthorized){
        //move on to the next middleware
        next()
    }
    else{
        res.status(401).end()
    }
}*/



const JWTConfig={
  secretOrKey: KEY,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('token'),  //get token from header bearer token
  passReqToCallback: true
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjAwZDA1MjE5MjJkMzFkOGE3NGY5YiIsImVtYWlsIjoiR2VyYWxkX0N1bm5pbmdoYW1AZmx1ZmZ5YnVubnljb25zdWx0aW5nLmNvbSJ9LCJpYXQiOjE2NjgwMjg5NDd9.o43VGsjzDbFaSwU28ZuiQBmMMZehNmsw0xQl3DtJITQ


passport.use("jwt",
  new JWTstrategy(
    JWTConfig,JWTVerify
  )
)
const verifyJWT=passport.authenticate('jwt', { session: false })
  /*
passport.use("jwt-verify-user",
  new JWTstrategy(
    JWTConfig,JWTVerifyUser
  )
)


passport.use("jwt-verify-user-or-manager",
  new JWTstrategy(
    JWTConfig,JWTVerifyUserOrManager
  )
)
*/

//authorization middlewares

//check if user is logined

//verify if user is same user with the "target"
//const verifyUser=passport.authenticate('jwt-verify-user', { session: false })

//verify if user is same user with the "target" or "target"`s manager
//const verifyUserOrManager=passport.authenticate('jwt-verify-user-or-manager', { session: false })




module.exports={
    verifyJWT
}
