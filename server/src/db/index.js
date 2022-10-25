const mongoose = require("mongoose") 

const employees=require("./test.json") // Testing file, will be moved into remote server
const { userSchema, goalSchema, commentSchema } = require('./schemas')

// This is put in place because 
const MONGODB_URL = process.env.CONNECTION_STRING || "mongodb+srv://yejoonjung:1357@cs320projecttest.t9mhlqf.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(MONGODB_URL)

db = mongoose.connection;

db.on("error", function () {
    console.log("Connection Failed!")
})

//on connection success
db.once("open", function () {
    console.log("Connected to mongodb!")
    // testCreate()
    generateGoals("635823b166a32968b45e328c")
    generateComments("635823b166a32968b45e328c","635825a2a4f26f9aa1d78f3e")
})

const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Goal = mongoose.model('Goal', goalSchema);


// const testSchema = new mongoose.Schema(
// 	{
// 		name: { type: String, required: true },
// 		content: { type: String, required: true },
// 		image: { data: Buffer, contentType: String },
// 	},
// 	{ timestamps: true }
// )

// const TestModel = mongoose.model("Test", testSchema)




// Simple test function to create the first 10 employees
//plz stop executing this function. There are already 1000 employees created .
async function testCreate() {
	//create document from JSON
	for(let i=1;i<100;++i){
		//upload first 10 data from json file
		const resolvedData = await User.create(employees[i])
	}

}
function randNumber(){
    return Math.floor(Math.random()*new Date().valueOf())
}

/**
 * generate goal documents
 * @param {*} posterId id of poster as string
 */
async function generateGoals(posterId) {
	//create document from JSON
    let date=new Date()
    let count=2
	for(let i=0;i<count;++i){
		//upload first 10 data from json file
		const resolvedData = await Goal.create({
            title:"goal_"+randNumber(),
            description:"an auto-generated goal",
            startDate:date,
            endDate:date,
            category:"none",
            status:false,
            poster:mongoose.Types.ObjectId(posterId) 
        })
        console.log(resolvedData)
	}
    

}

/**
 * generate comment documents
 * @param {*} posterId id of poster as string
 * @param {*} goalId id of goal as string
 */
async function generateComments(posterId,goalId) {
	//create document from JSON
    let count=2
	for(let i=0;i<count;++i){
		//upload first 10 data from json file
		const resolvedData = await Comment.create({
            content:"an auto-generated comment"+randNumber(),
            poster:mongoose.Types.ObjectId(posterId) ,
            goal:mongoose.Types.ObjectId(goalId) 
        })
        console.log(resolvedData)
	}
    

}

// Just a funky test function
async function testFetch() {
	//fetch all documents
	return await User.findAll()
}
// testCreate();
module.exports = {
    User,
    Comment,
    Goal,
    testCreate,
    testFetch
}

