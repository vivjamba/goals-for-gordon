const { User } = require("../index")

const { sendData, onServerError } = require("./statusHandlers")

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
}


//find all users
exports.list_all_users = (req, res) => {
    User.find({}).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))
;
}

//find users by email
exports.find_user_by_email = (req, res) => {
    User.find({ email: req.params.email }).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//find user by ID (employee + company)
exports.find_user_by_id = (req, res) => {
    User.find({ 
        employeeId: req.params.employeeId, 
        companyId: req.params.companyId
    }).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//find user by Mongoose ID
exports.find_user_by_mongo_id = (req, res) => {
    User.find({ 
        _id: req.params.mongo_id, 
    }).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))

}

//find an employee's manager 
exports.find_manager_by_id = (req, res) => {
    User.find({
        employeeId: req.params.managerId,
        companyId: req.params.companyId,
        isManager: true
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

