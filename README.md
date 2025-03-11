Blog Application

Overview

This is a Node.js-based blog application where users can view blogs, while admins have the ability to add, edit, and delete blog posts. The application uses EJS for frontend templating and MongoDB for data storage. Authentication and authorization are handled using JWT and bcrypt.

:- Tech Stack

> Backend: Node.js, Express.js

> Frontend: EJS Templates

> Database: MongoDB

> Authentication: JWT, bcrypt

> Session Management: express-session, cookie-parser

> Environment Variables: dotenv

:- Installation -

:- Prerequisites - 

> Install Node.js 
link- https://nodejs.org/en

> Install MongoDB
link- https://www.mongodb.com/atlas

1. Steps to Install:
git clone- https://github.com/Nikhil-Desai24/Blod_website_Node.js

> cd foldername

2. Install dependencies:
> npm install

3. Set up the environment variables by creating a .env file:
touch .env

4. dd the following variables inside .env:
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>

> Usage

> Running the Application

> To start the server:
npm start

> To start the server in development mode with nodemon:
npm run dev

> Folder Structure
blogpractice_node_crud_mongodb/
│── routes/              # All route handlers
│── views/               # EJS templates
│── models/              # Mongoose models
│── controllers/         # Controller functions
│── public/              # Static files (CSS, JS, images)
│── app.js               # Main server file
│── .env                 # Environment variables
│── package.json         # Dependencies and scripts


> Features

+ Display all blogs

+ Admin authentication (login/logout)

+ Add, edit, and delete blogs (admin only)

+ Secure authentication with JWT

+ Encrypted passwords using bcrypt

> Dependencies
    "dependencies": {
  "bcrypt": "^5.1.1",
  "connect-mongo": "^5.1.0",
  "cookie-parser": "^1.4.7",
  "dotenv": "^16.4.7",
  "ejs": "^3.1.10",
  "express": "^4.21.2",
  "express-ejs-layouts": "^2.5.1",
  "express-session": "^1.18.1",
  "jsonwebtoken": "^9.0.2",
  "method-override": "^3.0.0",
  "mongoose": "^8.10.1"
},
"devDependencies": {
  "nodemon": "^3.1.9"
}

:- License

> This project is licensed under the ISC License.

:- Author

> Nikhil Desai