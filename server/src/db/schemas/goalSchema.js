const mongoose = require('mongoose');

const goalSchema=new mongoose.Schema({
	title:{ type: String, required: true },
	description:{ type: String, required: true },
	startDate:Date,
	endDate:Date,
	category:String,
	status:{ type: Boolean, required: true },
	comments:[{
		type: mongoose.Types.ObjectId,
		ref: "Comment",
	}],
	poster:{
		type: mongoose.Types.ObjectId,
		ref: "Employee",
	},
})


module.exports = goalSchema;
