const { User } = require("../index")

const { sendData, onServerError } = require("./statusHandlers")
//find all users
exports.list_all_users = (req, res) => {
    User.find({}).then((data) => sendData(res,data))
    .catch((e)=> onServerError(res,e))
;
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

//find an employee's manager 
exports.find_manager_by_id = (req, res) => {
    User.findOne({
        employeeID: req.params.managerId,
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

