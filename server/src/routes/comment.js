const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const comment_controller = require("../db/controllers/commentController.js")

//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//READ

//get all comments
router.get("/list", comment_controller.list_all_comments)

//get comment by Mongoose _id
router.get("/:mongo_id", comment_controller.find_comment_by_id)

//get all comments associated with employee Mongoose _id
router.get("/employee/:mongo_id", comment_controller.find_comments_by_employee)

//get all comments associated with goal Mongoose _id
router.get("/goal/:_id", comment_controller.find_comments_by_goal)

//CREATE
//Create comment with all fields
router.post("/create", comment_controller.create_comment)

//Edit comment
router.post("/edit/:mongo_id", comment_controller.edit_comment)


module.exports=router
