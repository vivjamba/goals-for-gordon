const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const user_controller = require("../db/controllers/userController.js")

//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//READ

//get all users
//returns an array of User objects
router.get("/list", user_controller.list_all_users)

//get user by Mongoose ID
//returns a single User object
router.get("/:mongo_id", user_controller.find_user_by_mongo_id)

//get user identified by employeeId + companyId (guaranteed unique ID)
//returns a single User object
router.get("/id/:companyId-:employeeId", user_controller.find_user_by_id)

//get an employee's manager identified by employeeId + companyId
//**TO-DO: deprecate and use /id/:companyId-:employeeId route for the same purpose?
router.get("/manager/:companyId-:managerId", user_controller.find_manager_by_id)

//get all of a manager's employees, where managerId is manager's employeeId field
//returns array of User objects
router.get("/manager/list/:companyId-:managerId", user_controller.find_employees_by_manager)

//get users by email (will probably be deprecated eventually)
//returns array of User objects
router.get("/email/:email", user_controller.find_user_by_email)

//UPDATE

module.exports=router