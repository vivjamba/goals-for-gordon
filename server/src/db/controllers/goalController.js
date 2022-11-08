const {Goal}=require("../index")

//get all goals
exports.list_all_goals = (req, res) => {
    Goal.find({}).then((data)=>res.send(data));
}

//find goal by mongo_id
exports.find_goal_by_mongo_id = (req, res) => {
    Goal.find({_id: req.params.mongo_id}).then((data)=>res.send(data));
}

//find all goals created by an employee (query by employee's Mongoose _id)
exports.find_goals_by_employee = (req, res) => {
    Goal.find({ poster: req.params.mongo_id }).then((data)=>res.send(data));
}

//create a goal
exports.create_goal = (req, res) =>{
    //console.log(req.body)
    Goal.create(req.body).then((data)=>res.send(data));
}

//edit a goal
exports.edit_goal = (req, res) =>{
    Goal.findByIdAndUpdate(req.params.mongo_id, req.body, {new: true})
    .then((data)=>res.send(data));
}
