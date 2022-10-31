const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const user_controller = require("../db/controllers/userController.js")
//const {User}=require("./../db/index")

//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//READ

//sends all users
router.get("/list", user_controller.user_list_all)
//sends all users with the email
router.get("/:email", user_controller.user_find_email)
//sends user with given employeeId
router.get("/id/:employeeId", user_controller.user_find_id)
//sends employees manager
router.get("/manager/:companyId-:managerId", user_controller.user_employee_find_manager)
//sends all users who have given manager
router.get("/manager/list/:companyId-:managerId", user_controller.user_manager_find_employees)

//UPDATE

module.exports=router