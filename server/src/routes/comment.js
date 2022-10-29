const express = require('express');
const router = express.Router()
const comment_controller = require("../db/controllers/commentController.js")

//parser
router.use(bodyParser.json())
router.use(bodyParser.text())

//sends all comments
router.get("/", comment_controller.comment_list_all)

module.exports=router
