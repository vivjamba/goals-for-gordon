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

//get all comments associated with employee Mongoose _id
router.get("/employee/:_id", comment_controller.find_comments_by_employee)

//get all comments associated with goal Mongoose _id
router.get("/goal/:_id", comment_controller.find_comments_by_goal)

//get comment by Mongoose _id
router.get("/_id/:mongo_id", comment_controller.find_comment_by_id)

//CREATE
//Create comment with all fields
router.post("/create", comment_controller.create_comment)


/**
 * edit comment
 * data:{
 *  id:<commentId>,
 *  content:{<comment object>}
 * }
 */
router.post("/edit", comment_controller.edit_comment)


module.exports=router
