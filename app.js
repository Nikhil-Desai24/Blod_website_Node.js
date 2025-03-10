





require('dotenv').config();
const express = require('express');
const connectDB = require('./server/config/db');
const expressLayout = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const methodOverride = require('method-override');
const { isActiveRoute }= require('./server/helpers/routeHelpers.js')
// Connect to DB
connectDB();

// now we are able to send data through FORM
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: false, 
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}))
app.use(methodOverride('_method'));

// Public folder for using JavaScript, CSS, and images
app.use(express.static('public'));

// Template engines
app.use(expressLayout);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.locals.isActiveRoute = isActiveRoute; 

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
