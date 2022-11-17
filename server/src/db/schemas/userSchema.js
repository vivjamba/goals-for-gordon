const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		firstName: { 
			type: String, 
			required: true,
			immutable: true 
		},
		lastName: { 
			type: String, 
			required: true,
			immutable: true
		},
		employeeId:{
			type: Number,
			immutable: true
		},
        email: { 
			type: String, 
			required: true,
			immutable: true 
		},
		companyId:{
			type: Number,
			immutable: true
		},
		companyName : {
			type: String,
			immutable: true
		},
        managerId:{
			type: Number,
			immutable: true
		},
		positionTitle: {
			type: String,
			immutable: true
		},
		startDate:{
			type: String,
			immutable: true
		},
		isManager: { 
			type: Boolean, 
			required: true,
			immutable: true	
		},
		password: { 
			type: String, 
			required: true,
			immutable: true
		},
        preferredName: {
			type: String,
			immutable: false
		},
        profileImageDir: {
			type: Buffer,
			contentType: String,
			immutable: false
		}
	},
	{ timestamps: true }
)

module.exports = userSchema;


