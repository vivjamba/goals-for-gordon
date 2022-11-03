const {Goal}=require("../index")

//get all goals
exports.list_all_goals = (req, res) => {
    Goal.find({}).then((data)=>res.send(data));
}

//find all goals created by an employee (query by employee's Mongoose _id)
exports.find_goals_by_employee = (req, res) => {
    Goal.find({ poster: req.params._id }).then((data)=>res.send(data));
}

//create a goal
exports.create_goal = (req, res) =>{
    //console.log(req.body)
    Goal.create(req.body).then((data)=>res.send(data));
}

//edit a goal
exports.edit_goal = (req, res) =>{
    // console.log(req.body)
    Goal.findByIdAndUpdate(req.body.id,req.body.content).then((data)=>res.send(data));
}
