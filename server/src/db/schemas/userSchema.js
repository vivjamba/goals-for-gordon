const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		preferredName: String,
		employeeId:Number,
		companyId:Number,
		companyName : String,
		profileImageDir: {type:Buffer,contentType:String},
		positionTitle: String,
		startDate:String,
		manager: mongoose.Types.ObjectId,
		isManager: { type: Boolean, required: true },
		goals: [{type: mongoose.Types.ObjectId,
				ref: "Goal",
			},
		],
		email: { type: String, required: true },
		password: { type: String, required: true },
		employees: [{type: mongoose.Types.ObjectId,
			ref: "Employee",
		}]
	},
	{ timestamps: true }
)
module.exports = userSchema;
