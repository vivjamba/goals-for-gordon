const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const goal_controller = require("../db/controllers/goalController.js")

//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//sends all goals
router.get("/", goal_controller.goal_list_all)

//create goal
router.post("/create", goal_controller.goal_create_post)

module.exports=router
