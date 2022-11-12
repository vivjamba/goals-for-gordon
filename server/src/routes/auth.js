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
module.exports={
    auth
}