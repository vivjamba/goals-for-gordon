const { User,Goal,Comment } = require("./index")




async function edit_goal(req,res,next){
    console.log(req.mongo_id)
    let goal=await Goal.findById(req.mongo_id)
    console.log(goal)
    if(goal && goal.poster == req.user._id) next()
    else{
        res.status(401).end()
        return
    }
}
module.exports={
    edit_goal
}