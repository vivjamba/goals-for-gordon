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

To make sure you can connect to the database, you need a server/config folder with a variables.env file containing the MONGODB_URL. This file does not get committed.

### Running with Docker
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

### Running native

To run native, you must use multiple terminal windows or a terminal multiplexer such as tmux.

#### Server

##### Installation
```cd server
cd server
npm install
npm install nodemon
``````
to run
`npm run dev-up`

#### Client
```
cd client
npm install
npm run dev
```

## Update 2022-11-3

## REST API
#### User Routes

`/user/list`: get all users

`/user/<mongo_id>`: get user with mongo_id

`/user/id/<companyId>-<employeeId>`: get user identified by employeeId + companyId

`/user/email/:email: get user identified by email

`/user/manager/<companyId>-<managerId>`: get an employee's manager identified by employee's managerId + companyId

`/user/manager/list/<companyId>-<managerId>`: get all of a manager's employees, where managerId is a manager’s “employeeId” field

#### Goal Routes

`/goal/list`: get all goals

`/goal/:mongo_id`: get goal by mongo_id

`/goal/employee/<_id>`: get all goals created by an employee (query by employee's Mongoose _id)

`/goal/create`: create a goal with fields in request body 

`/goal/edit/:mongo_id`: edit a goal with given mongo_id with fields in request body JSON

#### Comment Routes

`/comment/list`: get all comments

`/comment/<mongo_id>`: get comment by its mongo _id

`/comment/employee/<mongo_id>`: get all comments associated with employee mongo_id

`/comment/goal/<mongo_id>`: get all comments associated with goal mongo_id

`/comment/create`: create a comment with fields in request body 

`/comment/edit/:mongo_id`: edit a comment with given mongo_id with fields in request body JSON

## file structure
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
    ┣ package.json     // Describes dependancies for server
    ┣ server.js        // Entry/main files for server
 ┣ docker-compose.yaml  // Describes how to run all docker images
 ┗ .gitignore           // what won't be uploaded to git
````
