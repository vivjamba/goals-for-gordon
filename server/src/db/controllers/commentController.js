const {Comment}=require("../index")

exports.comment_list_all = (req, res) => {
    Comment.find({}).then((data)=>res.send(data));
}
//get all comments associated with employee _id
exports.comment_list_all_employee = (req, res) => {
    Comment.find({poster: req.params.id}).then((data)=>res.send(data));
}
//get all comments associated with goal _id
exports.comment_list_all_goal = (req, res) => {
    Comment.find({goal: req.params.id}).then((data)=>res.send(data));
}
exports.comment_create = (req, res) => {
    Comment.create(req.body).then((data)=>res.send(data));
}
