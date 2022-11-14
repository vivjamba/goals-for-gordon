const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router()
const comment_controller = require("../db/controllers/commentController.js")
const {auth}=require("./auth.js")

//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//READ

/* 
get all comments
returns an array of Comment objects
*/
router.get("/list", comment_controller.list_all_comments)

/*
get comment by Mongoose _id
returns a single Comment object
*/
router.get("/:mongo_id", comment_controller.find_comment_by_id)

/*
get all comments associated with employee Mongoose _id
returns an array of Comment objects
*/
router.get("/employee/:mongo_id", comment_controller.find_comments_by_employee)

/*
get all comments associated with goal Mongoose _id
returns an array of Comment objects 
*/
router.get("/goal/:_id", comment_controller.find_comments_by_goal)

//CREATE

/*
Create comment with all fields in request body 
*/
router.post("/create", auth, comment_controller.create_comment)

//EDIT

/*
Edit comment by replacing with fields in request body 
*/
router.post("/edit/:mongo_id", auth, comment_controller.edit_comment)

//DELETE

/*
Delete goal with given mongo_id
*/
router.delete("/:mongo_id", auth, comment_controller.delete_comment)


module.exports=router
