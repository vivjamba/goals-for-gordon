const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const user_controller = require("../db/controllers/userController.js")

//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//READ

//get all users
router.get("/list", user_controller.list_all_users)

//get users by email
router.get("/:mogno_id", user_controller.find_user_by_mongo_id)

//get user identified by employeeId + companyId
router.get("/_id/:companyId-:employeeId", user_controller.find_user_by_id)

//get user by email
router.get("/email/:email", user_controller.find_user_by_email)

//get an employee's manager identified by employeeId + companyId
router.get("/manager/:companyId-:managerId", user_controller.find_manager_by_id)

//get all of a manager's employees
router.get("/manager/list/:companyId-:managerId", user_controller.find_employees_by_manager)

//UPDATE

module.exports=router