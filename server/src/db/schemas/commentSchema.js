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

//find all comments of a poster
commentSchema.statics.findByPoster = function (posterId) {
	return this.find({ poster: posterId })
}

//find all comments in the goal
commentSchema.statics.findByGoal = function (goalId) {
	return this.find({ goal: goalId })
}

module.exports = commentSchema;
