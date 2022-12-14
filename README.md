# goals-for-gordon

## Trello Board
https://trello.com/b/pePWfePv/employee-goals-app

## Slack
bestcs320team.slack.com

## Google Drive
https://drive.google.com/drive/u/1/folders/0ACyQyaNlcwHKUk9PVA

## Zoom Link
https://umass-amherst.zoom.us/j/96432975453

# Setup

## Step 1: 

Begin by cloning and entering into the root directory.

```
git clone https://github.com/vivjamba/goals-for-gordon/
cd goals-for-gordon
```


## Step 2: 

To make sure you can connect to the database, you need a .env file containing the MONGODB_URL. This file does not get committed. To get this file, click the link below and move the .env file in the server root directory at 
`goals-for-gordon/server` as shown in [file structure diagram](#file-structure).

<br>

https://drive.google.com/file/d/1tqmIYF2xmsc4lThFBdasznqQGEAH-kqw/view?usp=sharing

<br>

## Step 3:


Follow either [Running with Docker](#running-with-docker) or [Running Native](#running-native) steps below to install and run the client and server

<br>

## Step 4:


To access the full build, enter the client address into a web browser. 

Client address `localhost:5173`

The server can also be interacted with separately by sending [requests](#rest-api) to the server address


Server address `localhost:5000`

<br>

# Running with Docker
Ensure you download and run Docker daemon. 
```
cd server
npm install nodemon
cd ..
docker-compose up --build
```
This will build the entire environment for development (frontend + backend)


<br>

# Running Native

To run native, you must use multiple terminal windows or a terminal multiplexer such as tmux.

## Server

In one terminal window, run the following commands:

### Install
```
cd server
npm install
npm install nodemon
```
### Run
```
npm run dev-up
```

## Client

In a seperate terminal window, run the following commands:

### Install
```
cd client
npm install
```

### Run

```
npm run dev
```

<br>



# REST API

### *Update 2022-12-8*

## **Format Key**: 

`HTTP_REQUEST_TYPE /route/route/<variable value in route> => Response Body`

## User Routes

`GET /user/list => [User Objects]` <br> Get all users 

`POST /user/login`: attempt logging in by email and password using jwt
If email is wrong: respond with 401 with message "wrong email"
If password is wrong: respond with 401 with message "wrong password"


`GET /user/<mongo_id> => {User Object}`<br> Get user by mongo_id 

`GET /user/findByCompany/<companyId>/<employeeId> => {User Object}`<br> Get an employee's manager via comapnyId + managerId OR any employee via companyId + employeeId

`GET /user/manager/listEmployees/<companyId>/<managerId> => [User Objects]` <br> Get all of a manager's employees, where managerId is a manager’s “employeeId” field 

`GET /user/email/<email> => [User Objects]`<br> Get users identified by email 

`POST /user/edit/<mongo_id> => {Updated User Object}` <br> Edit a user with given mongo_id with fields in request body JSON (used for updating only mutable fields preferredName and profileImgDir)

<br>

## Goal Routes

`GET /goal/list => [Goal Objects]` <br> Get all goals 

`GET /goal/<mongo_id> => {Goal Object}` <br> Get goal by mongo_id

`GET /goal/employee/<mongo_id> => [Goal Objects]`<br> Get all goals created by an employee, query by employee's mongo_id 

`DELETE /goal/<mongo_id> => {Deleted Goal Object}` <br> delete goal by mongo_id 

`POST /goal/create => {Created Goal Object}` <br> Create a goal with fields in request body 

`POST /goal/edit/<mongo_id> => {Edited Goal Object}` <br> Edit a goal with given mongo_id with fields in request body JSON

<br>

## Comment Routes

`GET /comment/list => [Comment Objects]` <br> Get all comments 

`GET /comment/<mongo_id> => {Comment Object}` <br> Get comment by its mongo_id 

`GET /comment/employee/<mongo_id> => [Comment Objects]`<br> Get all comments associated with employee mongo_id 

`GET /comment/goal/<mongo_id> => [Comment Objects]` <br> Get all comments associated with goal mongo_id 

`DELETE /comment/<mongo_id> => {Deleted Comment Object}` <br> delete goal by mongo_id

`POST /comment/create => {Created Goal Object}` <br> Create a comment with fields in request body

`POST /comment/edit/<mongo_id> => {Edited Goal Object}`<br> edit a comment with given mongo_id with fields in request body JSON

<br>

# Object Structure

JSON objects including at least the **required** fields can be sent via requests and parsed into database documents. <br>
**Immutable** fields cannot be altered after initial document creation <br>


### User Object

```Javascript   
{
    firstName: String,      //Required, Immutable
    lastName: String,       //Required, Immutable
    employeeId: Number,     //Immutable
    email: String,          //Required, Immutable
    companyId: Number,      //Immutable
    companyName: String,    //Immutable
    managerId: Number,      //Immutable
    positionTitle: String,  //Immutable
    startDate: String,      //Immutable
    isManager: Boolean,     //Required, Immutable
    password: String,       //Required, Immutable
    preferredName: String,
    profileImageDir: Buffer //(String) 
} 
```

### Goal Object

```Javascript
{
    title: String, //Required
    description: String, //Required
    startDate: Date, //Required
    endDate:Date, //Required
    category: //Required
        String Enumerator ["personal", "performance", "developmental"], 
    status: //Default: Inactive
        String Enumerator ["inactive", "active", "complete"],
    poster: Mongoose Object ID (String) //Required
}
```

### Comment Object

```JavaScript
{
	content: String, //Required
	poster: Mongoose Object ID (String), //Required
	goal: Mongoose Object ID (String) //Required
}
```

# File Structure
```
📦goals-for-gordon
 ┣ client *todo*
    ┣ public
    ┣ src
    ┣ .vscode       // Folder describe vscode editor configs
    ┣ .dockerignore // What files to ignore when copying into docker image
    ┣ .gitignore    // What files to ignore when uploading to github
    ┣ Dockerfile    // How to make a docker image from this file structure 
    ┣ README.md         // Documentation on this module
    ┣ package.json      // Dependencies, scripts, etc
    ┣ package-lock.json // How to carry these dependencies to *Do not Edit*
    ┣ tsconfig.config.json
    ┣ tsconfig.json
    ┣ vite.config.ts    // vue package config, called vite becuase we use vite runtime
    ┣ env.d.ts
    ┗ index.html        // Entry point to html application
 ┣ server           // Where all the files for server live
    ┣ src            // Primary source files here
        ┣ db    
            ┣ schemas    // Schemas for the database
                ┗ <schemaHere>.js
            ┣ controllers    // Controllers for the routes
                ┗ <controllerHere>.js
            ┣ index.js    // Entry point for schema module
            ┗ test.json    // Test data
        ┣ routes    // routers for API
             ┗ <routerHere>.js
        ┗ util.js     //contains utility functions
    ┣ Dockerfile       // File describes our custom docker image
    ┣ .env             //This file is not distributed through github
    ┣ package.json     // Describes dependancies for server
    ┣ server.js        // Entry/main files for server
 ┣ docker-compose.yaml  // Describes how to run all docker images
 ┗ .gitignore           // what won't be uploaded to git
````
