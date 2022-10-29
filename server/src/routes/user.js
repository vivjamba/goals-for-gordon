const express = require('express');
const router = express.Router()
const user_controller = require("../db/controllers/userController.js")
//const {User}=require("./../db/index")

//sends all users
router.get("/", user_controller.user_list_all)
//sends all users with the email
router.get("/:email", user_controller.user_find_email)
//sends user with given employeeId
router.get("/id/:employeeId", user_controller.user_find_id)
//sends all users who have given manager
router.get("/manager/:managerId", user_controller.user_manager_find_employees)

module.exports=router