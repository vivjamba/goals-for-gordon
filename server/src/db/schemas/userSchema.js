const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		employeeId:Number,
        email: { type: String, required: true },
		companyId:Number,
		companyName : String,
        managerId:Number,
		positionTitle: String,
		startDate:String,
		isManager: { type: Boolean, required: true },
		password: { type: String, required: true },
        preferredName: String,
        profileImageDir: {type:Buffer,contentType:String}
	},
	{ timestamps: true }
)

module.exports = userSchema;


