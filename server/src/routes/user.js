const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const user_controller = require("../db/controllers/userController.js")
const {auth,verifyJWT}=require("./auth.js")
const { loginController}=require("../db/controllers/loginController")
//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//READ


/**
 * log in function
 */
router.post("/login",loginController)


router.post("/jwt_test/:id",verifyJWT,(req,res)=>{
    res.send("authorized")
})
router.get("/jwt_test/:id",verifyJWT,(req,res)=>{
    res.send("authorized")
})
/* 
get all users
returns an array of User objects
*/
router.get("/list", user_controller.list_all_users)

/*
get user by Mongoose ID
returns a single User object
*/
router.get("/:mongo_id", user_controller.find_user_by_mongo_id)

/*
get user identified by employeeId + companyId (guaranteed unique ID)
Find manager of useremployee using companyId + managerId or 
any user using companyId + employeeId
returns a single User object
*/
router.get("/findByCompany/:companyId/:employeeId", user_controller.find_by_company)

/*
get an employee's manager identified by employeeId + companyId
**TO-DO: deprecate and use /id/:companyId-:employeeId route for the same purpose?
*/
//router.get("/manager/:companyId-:managerId", user_controller.find_manager_by_id)

/*
get all of a manager's employees, where managerId is a manager's employeeId field
returns array of User objects
*/
router.get("/manager/listEmployees/:companyId/:managerId", user_controller.find_employees_by_manager)

/*
get users by email (will probably be deprecated eventually)
returns array of User objects
*/
router.get("/email/:email", user_controller.find_user_by_email)

//UPDATE

module.exports=router