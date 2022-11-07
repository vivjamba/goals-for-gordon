const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const goal_controller = require("../db/controllers/goalController.js")
const {auth}=require("./auth.js")

//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//READ

/* 
get all goals
returns an array of Goal objects
*/
router.get("/list", goal_controller.list_all_goals)

/* 
get goal by mongo_id
returns an single Goal object
*/
router.get("/:mongo_id", goal_controller.find_goal_by_mongo_id)

/*
get all goals created by an employee (query by employee's Mongoose _id)
returns an array of Goal objects
*/
router.get("/employee/:mongo_id", goal_controller.find_goals_by_employee)

//CREATE

/*
create goal with fields in request body
*/
router.post("/create",auth, goal_controller.create_goal)

//EDIT

/*
edit a goal by replacing with fields in request body
*/
router.post("/edit/:mongo_id",auth, goal_controller.edit_goal)


module.exports=router
