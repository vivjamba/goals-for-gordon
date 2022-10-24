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



// router.get("/:userId", function (req, res) {
//     const userId=req.params.userId
//     User.findById(userId).then((data)=>res.send(data));
// })

module.exports=router