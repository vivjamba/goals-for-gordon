const mongoose = require("mongoose") 

const employees=require("./test.json") // Testing file, will be moved into remote server
const { userSchema, goalSchema, commentSchema } = require('./schemas')
const util=require('./../util')


const MONGODB_URL = process.env.MONGODB_URL2

mongoose.connect(MONGODB_URL)

db = mongoose.connection;

db.on("error", function () {
    console.log("Connection Failed!")
})

//on connection success
db.once("open", function () {
    console.log("Connected to mongodb!")
    onDBConnect()
})

const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Goal = mongoose.model('Goal', goalSchema);

function onDBConnect(){

    //testCreateAll()
    //testCreate()
    //generateUsers()
    //generateGoals("635823b166a32968b45e328c")
    // generateComments("635823b166a32968b45e328c","635825a2a4f26f9aa1d78f3e")
}

async function testCreateAll() {
    await User.create(employees)
}

async function testCreate() {
	//create document from JSON
	for(let i=0;i<3;++i){
		//upload first 10 data from json file
		const resolvedData = await User.create(employees[i])
        
        //Reverse add manager (Bad)
        //manager = await User.find({managerId: resolvedData.managerId})
        //await User.findByIdAndUpdate(manager._id, )
	}
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
		const resolvedData = await Goal.create({
            title:"goal_"+util.randNumber(),
            description:"an auto-generated goal",
            startDate:date,
            endDate:date,
            category:"none",
            status:"inactive",
            poster:mongoose.Types.ObjectId(posterId) 
        })
        //console.log(resolvedData)
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
		const resolvedData = await Comment.create({
            content:"an auto-generated comment"+util.randNumber(),
            poster:mongoose.Types.ObjectId(posterId) ,
            goal:mongoose.Types.ObjectId(goalId) 
        })
        //console.log(resolvedData)
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
    Goal
}

