const {Comment}=require("../index")

exports.comment_list_all = (req, res) => {
    Comment.find({}).then((data)=>res.send(data));
}
