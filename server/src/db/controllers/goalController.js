const {Goal}=require("../index")

exports.goal_list_all = (req, res) => {
    Goal.find({}).then((data)=>res.send(data));
}
exports.goal_create_post = (req, res) =>{
    //console.log(req.body)
    Goal.create(req.body).then((data)=>res.send(data));
}
