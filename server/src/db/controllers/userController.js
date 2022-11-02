const { User } = require("../index")

//find all users
exports.list_all_users = (req, res) => {
    User.find({}).then((data) => res.send(data));
}

//find users by email
exports.find_by_email = (req, res) => {
    User.find({ email: req.params.email }).then((data) => res.send(data))
}

//find user by ID (employee + company)
exports.find_user_by_id = (req, res) => {
    User.find({ 
        employeeId: req.params.employeeId, 
        companyId: req.params.companyId
    }).then((data) => res.send(data))
}

//find user by Mongoose ID
exports.find_user_by_mongo_id = (req, res) => {
    User.find({ 
        _id: req.params.mongo_id, 
    }).then((data) => res.send(data))
}

//find an employee's manager 
exports.find_manager_by_id = (req, res) => {
    User.find({
        employeeID: req.params.managerId,
        companyId: req.params.companyId,
        isManager: true
    }).then((data) => res.send(data))
}

//find all of a manager's employees  
exports.find_employees_by_manager = (req, res) => {
    User.find({
        managerId: req.params.managerId,
        companyId: req.params.companyId,
    }).then((data) => res.send(data))
}

