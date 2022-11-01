const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const comment_controller = require("../db/controllers/commentController.js")

//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//READ

//sends all comments
router.get("/", comment_controller.comment_list_all)
//get all comments associated with employee _id
router.get("/employee/:id", comment_controller.comment_list_all_employee)
//get all comments associated with goal _id
router.get("/goal/:id", comment_controller.comment_list_all_goal)

//CREATE
//Create comment with all fields
router.post("/create", comment_controller.comment_create)

module.exports=router
