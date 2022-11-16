const {Goal}=require("../index")

const { sendData, onServerError } = require("./statusHandlers")

//get all goals
exports.list_all_goals = (req, res) => {
    Goal.find({}).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//find goal by mongo_id
exports.find_goal_by_mongo_id = (req, res) => {
    Goal.findOne({_id: req.params.mongo_id}).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//find goal by mongo_id with comments
exports.find_goal_by_mongo_id_with_comments = (req, res) => {
    Goal.findOne({_id: req.params.mongo_id}).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//find all goals created by an employee (query by employee's Mongoose _id)
exports.find_goals_by_employee = (req, res) => {
    Goal.find({ poster: req.params.mongo_id }).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//create a goal
exports.create_goal = (req, res) =>{
    //console.log(req.body)
    Goal.create(req.body).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//edit a goal by mongo_id
exports.edit_goal = (req, res) =>{
    console.log(req.params)
    Goal.findByIdAndUpdate(req.params.mongo_id, req.body, {new: true})
    .then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))
}

//delete a goal by mongo_id
exports.delete_goal = (req, res) =>{
    Goal.findByIdAndDelete(req.params.mongo_id)
    .then((data) => sendData(res, data))
    .catch((e)=> onServerError(res,e))
}