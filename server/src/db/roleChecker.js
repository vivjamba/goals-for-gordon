const { User,Goal,Comment } = require("./index")

/**
 * Helper functions 
 */

/**
 * 
 * @param {*} posterMongoId poster`s mongo id
 * @param {*} req 
 * @returns true if logged in user`s id equals poster mongo id
 */
function isLoggedInUserPoster(posterMongoId,req){
    return req.user != undefined && String(posterMongoId) === req.user._id
}

/**
 * 
 * @param {*} posterEmployeeId poster`s employee id
 * @param {*} req 
 * @returns true if logged in user`s employee id is poster`s managerId
 */
async function isLoggedInUserManagerOfPoster(posterMongoId,req){
    let user=await User.findById(posterMongoId) 
    if(!user) return false
     return req.employeeId == user.managerId
}

/**
 * moves on to next middleware if logged in user is poster or poster`s manager, 
 * otherwise send 401 unauthorized. 
 * 
 * @param {*} posterMongoId poster`s employee id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function controlManagerPermission(posterMongoId,req,res,next){
    
    let isManagerOfPoster = await isLoggedInUserManagerOfPoster(posterMongoId,req)

    if(isLoggedInUserPoster(posterMongoId,req) || isManagerOfPoster)
    {
        next()
    }
    else{
        res.status(401).end()
        return
    }
}


/**
 * Role checkers
 * These middleware functions will be placed after jwt verification and before the actual controllers.
 * These will check whether the logged in user have permission to do such action.
 * if not, responds with 401 unauthorized.
 * 
 * if verified, moves to next middleware which is actual controllers fot the routes
 * 
 * THESE FUNCTIONS ARE NOT TESTED YET
 */



/**
 * req.user (passed from decrypted JWT)
    = information of the user currently logged in

 * attributes:

 * _id : user`s mongo id
 * email : user`s email
 * employeeId : user`s employee id (Number)
 */





/**
 * only the poster of the goal can edit or delete goal
 */
async function edit_or_delete_goal(req,res,next){

    let goal=await Goal.findById(req.params.mongo_id)
    
    if(goal && isLoggedInUserPoster(goal.poster,req)) next()
    else{
        res.status(401).end()
        return
    }
}



/**
 * only the poster of the goal can edit or delete comment
 */
async function edit_or_delete_comment(req,res,next){
    let comm=await Comment.findById(req.params.mongo_id)

    if(comm && isLoggedInUserPoster(comm.poster,req)) next()
    else{
        res.status(401).end()
        return
    }
}

/**
 * poster of the goal or poster`s manager can only read the goal
 */
async function read_goal_by_id(req,res,next){
    let goal_mongo_id=req.params.mongo_id

    let goal=await Goal.findById(goal_mongo_id)

    if(!goal){
        res.status(404).end()
        return
    }

    controlManagerPermission(goal.poster,req,res,next)
}


/**
 * poster of the goal/comment or poster`s manager can only read the goal/comment
 */
async function read_by_poster_id(req,res,next){
    let poster_id=req.params.mongo_id

    controlManagerPermission(poster_id,req,res,next)

}

/**
 * poster of the comment or poster`s manager can only read the comment
 */
async function read_comment_by_id(req,res,next){
    //TODO
    let comment_mongo_id=req.params.mongo_id

    let comment=await Comment.findById(comment_mongo_id)

    if(!comment){
        res.status(404).end()
        return
    }
    controlManagerPermission(comment.poster,req,res,next)


}

/**
 * poster of the comment or poster`s manager can only read the comment
 */
async function read_comment_by_goal_id(req,res,next){
 //TODO

    let goal_mongo_id=req.params.mongo_id

    let goal=await Goal.findById(goal_mongo_id)

    if(!goal){
        res.status(404).end()
        return
    }
    controlManagerPermission(goal.poster,req,res,next)

}




/**
 * Make sure the user cannot "forge" the poster of the goal(cannot pretend the goal is created by others)
 * 
 * compare poster field in the request body to user that currently logged in 
 * 
 * 
 */
async function create_goal(req,res,next){
     //TODO
     console.log(req.body.poster)
     console.log(req.user._id)
     if(req.body.poster && isLoggedInUserPoster(req.body.poster,req)) next()
    else{
        res.status(401).end()
        return
    }
}


/**
 * Make sure the user cannot "forge" the poster of the comment(cannot pretend the comment is created by others)
 * and make sure not to put the comment to a wrong goal
 * 
 * 1. compare poster field in the request body to user that currently logged in 
 * 
 * 2. the goal of this comment should be a goal of the user or user`s sub employee
 * 
 */
async function create_comment(req,res,next){
 //TODO
    if(!req.body.poster || !isLoggedInUserPoster(req.body.poster,req)){
            
        res.status(401).end()
        return
    }

    let goal=await Goal.findById(req.body.goal)
    if(!goal){
        res.status(500).end()
        return
    }
    controlManagerPermission(goal.poster,req,res,next)

}

module.exports={
    edit_or_delete_goal,edit_or_delete_comment,
    read_goal_by_id,read_by_poster_id,read_comment_by_id
    ,read_comment_by_goal_id,create_goal,create_comment

}
