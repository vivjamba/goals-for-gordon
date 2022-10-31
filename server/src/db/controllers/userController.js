const { User } = require("../index")

exports.user_list_all = (req, res) => {
    User.find({}).then((data) => res.send(data));
}
exports.user_find_email = (req, res) => {
    User.find({ email: req.params.email }).then((data) => res.send(data))
}
exports.user_find_id = (req, res) => {
    User.find({ employeeId: req.params.employeeId }).then((data) => res.send(data))
}
exports.user_manager_find_employees = (req, res) => {
    User.find({
        managerId: req.params.managerId,
        companyId: req.params.companyId,
        isManager: false
    }).then((data) => res.send(data))
}
exports.user_employee_find_manager = (req, res) => {
    User.find({
        managerId: req.params.managerId,
        companyId: req.params.companyId,
        isManager: true
    }).then((data) => res.send(data))
}

