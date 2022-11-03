const {Comment}=require("../index")

//find all comments
exports.list_all_comments = (req, res) => {
    Comment.find({}).then((data)=>res.send(data));
}

//get all comments associated with employee Mongoose _id
exports.find_comments_by_employee = (req, res) => {
    Comment.find({poster: req.params.mongo_id}).then((data)=>res.send(data));
}

//get all comments associated with goal Mongoose _id
exports.find_comments_by_goal = (req, res) => {
    Comment.find({goal: req.params.mongo_id}).then((data)=>res.send(data));
}

//get a comment associated with comment Mongoose _id
exports.find_comment_by_id = (req, res) => {
    Comment.find({_id: req.params.mongo_id}).then((data)=>res.send(data));
}

exports.create_comment = (req, res) => {
    Comment.create(req.body).then((data)=>res.send(data));
}

exports.edit_comment = (req, res) =>{
    //console.log(req.body)
    Comment.findByIdAndUpdate(req.params.mongo_id,req.body).then((data)=>res.send(data));
}
