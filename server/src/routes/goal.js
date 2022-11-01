const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const goal_controller = require("../db/controllers/goalController.js")

//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//READ

//sends all goals
router.get("/", goal_controller.goal_list_all)
//sends all goals created by given employee id
router.get("/employee/:id", goal_controller.goal_list_all_employee)
//sends the goals of all the employees that is visable to this manager, including their own
//router.get("/manager/:id", goal_controller.goal_list_all_manager)

//CREATE

//create goal
router.post("/create", goal_controller.goal_create_post)


/**
 * edit goal
 * data:{
 *  id:<goalId>,
 *  content:{<goal object>}
 * }
 */
router.post("/edit", goal_controller.goal_edit_post)


module.exports=router
