const {Comment}=require("../index")

const { sendData, onServerError } = require("./statusHandlers")

//find all comments
exports.list_all_comments = (req, res) => {
    Comment.find({}).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//get all comments associated with employee Mongoose _id
exports.find_comments_by_employee = (req, res) => {
    Comment.find({poster: req.params.mongo_id}).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//get all comments associated with goal Mongoose _id
exports.find_comments_by_goal = (req, res) => {
    Comment.find({goal: req.params.mongo_id}).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//get a comment associated with comment Mongoose _id
exports.find_comment_by_id = (req, res) => {
    Comment.find({_id: req.params.mongo_id}).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

exports.create_comment = (req, res) => {
    Comment.create(req.body).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

exports.edit_comment = (req, res) =>{
    Comment.findByIdAndUpdate(req.params.mongo_id, req.body, {new: true})
    .then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}
