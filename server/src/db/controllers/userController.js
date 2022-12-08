const { User } = require("../index")

const { sendData, onServerError } = require("./statusHandlers")
/*
exports.check_login= async function check_login(req,res){
    let email=req.body.email
    let pw=req.body.password
    try{

        const user=await User.find({ email: email })
        if(!user || user.length==0) {
            res.status(401).end("wrong email")
            return
        }
        if(user[0].password!==pw) {
            res.status(401).end("wrong password")
            return
        }
        res.status(200).end("successfully logged in")
    }
    catch(e){
        onServerError(res,e)
    }
}*/


//find all users
exports.list_all_users = (req, res) => {
    User.find({}).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e));
}

//find users by email (will probably be deprecated eventually)
exports.find_user_by_email = (req, res) => {
    User.find({ email: req.params.email }).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))
}

//find user by employeeId + companyId (guaranteed unique ID)
exports.find_user_by_id = (req, res) => {
    User.findOne({ 
        employeeId: req.params.employeeId, 
        companyId: req.params.companyId
    }).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//find user by Mongoose ID
exports.find_user_by_mongo_id = (req, res) => {
    User.findOne({ 
        _id: req.params.mongo_id, 
    }).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//find an employee or manager by companyId + employeeId 
exports.find_by_company = (req, res) => {
    User.findOne({
        employeeId: req.params.employeeId,
        companyId: req.params.companyId,
    }).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}


//find all of a manager's employees  
exports.find_employees_by_manager = (req, res) => {
    User.find({
        managerId: req.params.managerId,
        companyId: req.params.companyId,
    }).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}


//edit a user's mutable fields by mongo_id
exports.edit_user = (req, res) =>{
    User.findByIdAndUpdate(req.params.mongo_id, req.body, {new: true})
    .then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}