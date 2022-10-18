const mongoose = require("mongoose") 

const employees=require("./test.json") // Testing file, will be moved into remote server
const { userSchema, goalSchema, commentSchema } = require('./schemas')

const MONGODB_URL = "mongodb+srv://yejoonjung:1357@cs320projecttest.t9mhlqf.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(MONGODB_URL)

db = mongoose.connection;

db.on("error", function () {
    console.log("Connection Failed!")
})

//on connection success
db.once("open", function () {
    console.log("Connected to mongodb!")
})

const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Goal = mongoose.model('Goal', goalSchema);


const testSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		content: { type: String, required: true },
		image: { data: Buffer, contentType: String },
	},
	{ timestamps: true }
)

const TestModel = mongoose.model("Test", testSchema)

// Simple test function to create the first 10 employees
async function testCreate() {
	//create document from JSON
	for(let i=1;i<10;++i){
		//upload first 10 data from json file
		const resolvedData = await User.create(employees[i])
		//retrieve auto-generated object id
		const id = resolvedData._id
		console.log(resolvedData)
		console.log(id)
	}
}
// Just a funky test function
async function testFetch() {
	//fetch all documents
	return await User.find({}, )
}
testCreate();
module.exports = {
    User,
    Comment,
    Goal,
    testCreate,
    testFetch
}

