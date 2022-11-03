const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const goal_controller = require("../db/controllers/goalController.js")

//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//READ

//get all goals
router.get("/list", goal_controller.list_all_goals)

//get goal by mongo_id
router.get("/:mongo_id", goal_controller.find_goal_by_mongo_id)

//get all goals created by an employee (query by employee's Mongoose _id)
router.get("/employee/:mongo_id", goal_controller.find_goals_by_employee)

//sends the goals of all the employees that is visable to this manager, including their own
//router.get("/manager/:id", goal_controller.goal_list_all_manager)

//CREATE

//create goal
router.post("/create", goal_controller.create_goal)

//EDIT

//edit a goal
router.post("/edit/:mongo_id", goal_controller.edit_goal)


module.exports=router
