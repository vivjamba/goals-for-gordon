# goals-for-gordon

Backend available at `localhost:5000` with a demo at `localhost:5000/dbtest`

## Development Installation

Begin by cloning and entering into directory.

`git clone https://github.com/vivjamba/goals-for-gordon/`
`cd goals-for-gordon`

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
install new dependances, or alter any Docker related files. Working on making
this a less frequent requirement;

### Running native

#### Server
```cd server
cd server
npm install
npm install nodemon
npm run dev-up
```

#### Client *TODO*

## File Structure

goals-for-gordon

```|- client *todo*

    |

|- server               // Where all the files for server live

    |- src                  // Primary source files here

        |- schemas              // Schemas for the database

            |- <schemaHere>.js

        |- index.js         // Entry point for schema module

        |- test.json        // Test data

    |- Dockerfile       // File describes our custom docker image

    |- package.json     // Describes dependancies for server

    |- server.js        // Entry/main files for server

|- .gitignore           // what won't be uploaded to git

|- docker-compose.yaml  // Describes how to run all docker images

```

## Update 2022-10-23

## REST API
`/user/`:fetchs all users
`/user/<email>`:fetchs all users with email

## updated file structure
```
📦goals-for-gordon
 ┣ client *todo*
 ┣ server           // Where all the files for server live
    ┣ src            // Primary source files here
        ┣ schemas    // Schemas for the database
            ┗ <schemaHere>.js
        ┣ routes    // routers for API
             ┗ <routerHere>.js
        ┣ index.js    // Entry point for schema module
        ┗ test.json    // Test data
    ┣ Dockerfile       // File describes our custom docker image
    ┣ package.json     // Describes dependancies for server
    ┣ server.js        // Entry/main files for server
 ┣ docker-compose.yaml  // Describes how to run all docker images
 ┗ .gitignore           // what won't be uploaded to git

````