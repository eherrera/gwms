# Fullstack javascript Gateways management demo
Technologies: 
Backend: Node.js, express.js, MongoDB, mongoose
Frontend: Angular
## Getting started
This is a basic fullstack javascript demo.
A demo of this API is located at: https://i7xaw1a3m4.execute-api.us-west-2.amazonaws.com/dev/
The frontend demo is hosted at: https://d349ktkqyrsnwj.cloudfront.net/
To login website use:

> user: admin@example.com, pass: admin
# Installation guide (backend + frontend)

1. Clone the project from github (recommended) or manual download zip


`git clone https://github.com/eherrera/gwms.git ./myfolder`

2. backend: Install npm dependencies

`cd backend` 

`npm install`

`npm update`

3. backend: Setting up environment variables

`copy .env.example to .env and update port and mongodb uri`

4. backend: How to run

There are 4 available commands for this: fresh, clean, seed and dev:

    npm run command
    fresh: cleans and the seeds the database with dynamic data
    clean: cleans the database
    seed: seeds the database with dynamic data
    dev: run the backend in development mode


5. Postman collection in backend/gwms.postman_collection.json 

6. frontend: How to run

`cd ../frontend`

`npm run start`

7. frontend: Unit tests

`npm run test`
    
