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

/*
//returns all users
userSchema.statics.findAll = function () {
	return this.find()
}
//find all users with the email
userSchema.statics.findByEmail = function (email) {
	return this.find({ email: email })
}

//find all employees of a manager
userSchema.statics.findByManager = function (inputManagerId) {
    return this.find({ managerId: inputManagerId })
}

//find employee by ID number
userSchema.statics.findById = function (inputEmployeeId) {
    return this.find({ employeeId: inputEmployeeId })
}
*/
module.exports = userSchema;


