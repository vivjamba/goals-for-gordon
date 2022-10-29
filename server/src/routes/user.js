const express = require('express');
const router = express.Router()
const {User}=require("./../db/index")

//sends all users
router.get("/", function (req, res) {
    User.findAll().then((data)=>res.send(data));
})
//sends all users with the email
router.get("/:email", function (req, res) {
    const email=req.params.email
    User.findByEmail(email).then((data)=>res.send(data));
})
//sends all users who have given manager
router.get("/manager/:managerId", function (req, res) {
    const manager=req.params.managerId
    User.findByManager(manager).then((data)=>res.send(data));
})

//sends user with given employeeId //OLD VERSION
router.get("/employee/:employeeId", function (req, res) {
    const userId=req.params.employeeId
    User.findById(userId).then((data)=>res.send(data));
})

//sends user with given employeeId //NEW VERSION (what is difference?)
router.get("/employee2/:employeeId", function (req, res) {
    //const userId=req.params.employeeId
    //User.findById(userId).then((data)=>res.send(data));
    User.find({employeeId: req.params.employeeId}).then((data)=>res.send(data))
})

module.exports=router