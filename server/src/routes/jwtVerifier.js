const JWTVerify=async (req,token, done) => {
    try {
      
      if(token.user){
        console.log(req.params)
        console.log(token.user)
        return done(null, token.user);
      }
      else return done(new Error("Invalid token"))
  
    } catch (error) {
      done(error);
    }
  }
  
  module.exports={
    JWTVerify
  }