const mongoose = require('mongoose');

const commentSchema=new mongoose.Schema({
	content:{ type: String, required: true },
	poster:{
		type: mongoose.Types.ObjectId,
		ref: "Employee",
	},
	goal:{
		type: mongoose.Types.ObjectId,
		ref: "Goal",
	}
})

module.exports = commentSchema;
