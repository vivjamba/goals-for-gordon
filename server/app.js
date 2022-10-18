// import { createServer } from "http"

// const express = require("express")  //npm install express

// const app = express()
// const httpserver = createServer(app)
// httpserver.listen(80)
// app.on("error", (err) => {
// 	console.error("Server error:", err)
// })

//modules should be installed using npm
const mongoose = require("mongoose") //npm install mongoose
const employees=require("./test.json")

//temporary mongodb database url for testing
//CHANGE THIS URL TO CONNECT LOCAL DATABASE
const MONGODB_URL = "mongodb+srv://yejoonjung:1357@cs320projecttest.t9mhlqf.mongodb.net/?retryWrites=true&w=majority"

try {
	mongoose.connect(MONGODB_URL)
} catch (e) {
	console.log("mongodb Connection Failed!")
}

const db = mongoose.connection

// on connection fail
db.on("error", function () {
	console.log("Connection Failed!")
})

//on connection success
db.once("open", function () {
	console.log("Connected to mongodb!")
	testCreate()
	// testFetch()
})

//schema structure
const testSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		content: { type: String, required: true },
		image: { data: Buffer, contentType: String },
	},
	{ timestamps: true }
)

//create document from JSON
testSchema.statics.create = function (data) {
	return new TestModel(data).save()
}

//returns a document that has the id
testSchema.statics.findOneById = function (id) {
	return this.findById(id)
}

//returns all documents that has same name
testSchema.statics.findByName = function (name) {
	return this.find({ name: name })
}

//returns all documents
testSchema.statics.findAll = function () {
	return this.find()
}

//rough idea of a emplyee schema we will be using in the project
const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		preferedName: String,
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
		comments: [{type: mongoose.Types.ObjectId,
			ref: "Comment",
		},],
		email: { type: String, required: true },
		password: { type: String, required: true },
		employees: [{type: mongoose.Types.ObjectId,
			ref: "Employee",
		}]
	},
	{ timestamps: true }
)

/**
 * //Goal
{
    "_id" : <unique DB id>,
    "title" : String
    "description" : String
    "startDate" : Date,
    "endDate" : Date,
    "category" : String,
    "status" : Boolean
    "comments" : [<comment documents / IDs>]
}
//Comment
{
    "_id" : <unique DB id>,
    "poster" : <employee document / ID>
    "time" : Date
    "text" : String
}
 */
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
/*
// 	return this.findById(id).select("replys").populate("replys")
// 	return this.findByIdAndUpdate(id, { $addToSet: { articles: articleId } })
		.sort({ createdAt: "desc" })
		.skip(start)
		.limit(count)
		.select("createdAt ")
 */

//create model using schema
const TestModel = mongoose.model("Test", testSchema)
const EmployeeModel = mongoose.model("TestUser", userSchema)

async function testCreate() {
	//create document from JSON
	for(let i=1;i<10;++i){
		//upload first 10 data from json file
		const resolvedData = await EmployeeModel.create(employees[i])
		//retrieve auto-generated object id
		const id = resolvedData._id
		console.log(resolvedData)
		console.log(id)
	}
}

async function testFetch() {
	//fetch documents with name "john"
	const test = await TestModel.findByName("Hi")
	console.log(test)
	//fetch all documents
	const all = await TestModel.findAll()
	console.log(all)
}

/**
 * 
router.get('/getImage/:id', async (req, res, next) => {
    const { id: _id } = req.params;
    // If you dont use lean(), you wont decode image as base64
    const image = await ImageModel.findOne({ _id }).lean().exec();
    res.send(image);
});
 */
