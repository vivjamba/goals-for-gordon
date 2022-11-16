
/**
 * verify if the jwt is valid
 * (check if user is logged in)
 */
const JWTVerify=async (req,token, done) => {
    try {
      
      if(token.user){
        console.log(req.params)
        console.log(token.user)
        return done(null, token.user); // authorization success
      }
      else return done(new Error("Invalid token"))
  
    } catch (error) {
      done(error);
    }
  }
  
  /**
   * UNUSED, WILL BE REMOVED
   * verify if user is same user with the "target"
   * 
   * i.e.
   * when editing goals, checks if the user is the poster of the goal
   */
  const JWTVerifyUser=async (req,token, done) => {
    try {

      //targetId will be passed through req parameter.
      //below is subject to change
      if(!req.targetId) return done(new Error("No argument passed"))

      //compare user id in jwt with the "target" id
      if(token.user && token.user._id===req.targetId){
        return done(null, token.user); // authorization success
      }
      else return done(new Error("Invalid token"))
  
    } catch (error) {
      done(error);
    }
  }
  
  /**
  * UNUSED, WILL BE REMOVED
   * verify if user is same user with the "target" or "target"`s manager
   * 
   */
  const JWTVerifyUserOrManager=async (req,token, done) => {
    try {
      if(!req.targetId || !req.managerId) return done(new Error("No argument passed"))

      //compare user id in jwt with the "target" id or "target"`s manager`s id
      if(token.user && (token.user._id===req.targetId || token.user._id===req.managerId)){
        return done(null, token.user); //success
      }
      else return done(new Error("Invalid token"))
  
    } catch (error) {
      done(error);
    }
  }
  
  module.exports={
    JWTVerify,JWTVerifyUser,JWTVerifyUserOrManager
  }