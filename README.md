# goals-for-gordon

Frontend available at `localhost:5173`

Backend available at `localhost:5000`


## Trello Board
https://trello.com/b/pePWfePv/employee-goals-app

## Slack
bestcs320team.slack.com

## Google Drive
https://drive.google.com/drive/u/1/folders/0ACyQyaNlcwHKUk9PVA

## Zoom Link
https://umass-amherst.zoom.us/j/96432975453

## Development Installation

Begin by cloning and entering into directory.

`git clone https://github.com/vivjamba/goals-for-gordon/`
`cd goals-for-gordon`

To make sure you can connect to the database, you need a .env file containing the MONGODB_URL in the server root directory (goals-for-gordon/server). This file does not get committed.

# Running with Docker
Ensure you download and run Docker daemon. 
```
cd server
npm install nodemon
cd ..
docker-compose up --build
```
This will build the entire environment for development (frontend + backend)
*Note: The `--build` tag atm is only require for when you create new files,
install new dependencies, or alter any Docker related files. Working on making
this a less frequent requirement;

# Running Native

To run native, you must use multiple terminal windows or a terminal multiplexer such as tmux.

## Server

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

### Install
```
cd client
npm install
npm run dev
```

### Run

```
npm run dev
```

# REST API

### *Update 2022-12-8*

## **Format Key**: 

`HTTP_REQUEST_TYPE /route/route/<variable set by value in route> => Response Body Contents`

## User Routes

`GET /user/list => [User Objects]` <br> Get all users 

`POST /user/login_jwt => {JSON Web Token}` <br> Authenticate users using email and password and respond with a JSON Web Token


**DEPRICATED** `POST /user/login` <br> Attempt logging in by email and password
If email is wrong: respond with 401 with message "wrong email"
If password is wrong: respond with 401 with message "wrong password"

`GET /user/<mongo_id> => {User Object}`<br> Get user by mongo_id 

`GET /user/findByCompany/<companyId>/<employeeId> => {User Object}`<br> Get an employee's manager via comapnyId + managerId OR any employee via companyId + employeeId

`GET /user/manager/listEmployees/<companyId>/<managerId> => [User Objects]` <br> Get all of a manager's employees, where managerId is a manager’s “employeeId” field 

`GET /user/email/<email> => [User Objects]`<br> Get users identified by email 

`POST /user/edit/<mongo_id> => {Updated User Object}` <br> Edit a user with given mongo_id with fields in request body JSON (used for updating only mutable fields preferredName and profileImgDir)

## Goal Routes

`GET /goal/list => [Goal Objects]` <br> Get all goals 

`GET /goal/<mongo_id> => {Goal Object}` <br> Get goal by mongo_id

`DELETE /goal/<mongo_id> => {Deleted Goal Object}` <br> delete goal by mongo_id 

**PLACEHOLDER (Delete?)** `/goal/withComments/<mongo_id>`: (PLACEHOLDER) get goal as well as any comments on that goal by mongo_id. PLANNED: Return array with goal object followed by comment objects CURRENT: returns only goal object

`GET /goal/employee/<mongo_id> => [Goal Objects]`<br> Get all goals created by an employee, query by employee's mongo_id 

`POST /goal/create => {Created Goal Object}` <br> Create a goal with fields in request body 

`POST /goal/edit/<mongo_id> => {Edited Goal Object}` <br> Edit a goal with given mongo_id with fields in request body JSON

## Comment Routes

`GET /comment/list => [Comment Objects]` <br> Get all comments 

`GET /comment/<mongo_id> => {Comment Object}` <br> Get comment by its mongo_id 

`GET /comment/employee/<mongo_id> => [Comment Objects]`<br> Get all comments associated with employee mongo_id 

`GET /comment/goal/<mongo_id> => [Comment Objects]` <br> Get all comments associated with goal mongo_id 

`DELETE /comment/<mongo_id> => {Deleted Comment Object}` <br> delete goal by mongo_id

`POST /comment/create => {Created Goal Object}` <br> Create a comment with fields in request body

`POST /comment/edit/<mongo_id> => {Edited Goal Object}`<br> edit a comment with given mongo_id with fields in request body JSON

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
