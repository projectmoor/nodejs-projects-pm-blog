// miscelleous
const path = require('path');

// set up server
const express = require('express');
const app = express();

// set up router step 1
const home = require('./route/home');
const admin = require('./route/admin');

// set up parser for form submitted data and params
// body-parser provides req.body for us to access submitted post data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); 

// set up template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art'); // default file extention for template is art
app.engine('art', require('express-art-template')); // for .art files, use express-art-template engine

// access dateformat in art template files
const dateFormat = require('dateformat');
const template = require('art-template');
template.defaults.imports.dateFormat = dateFormat;

// access toUpperCase function in art template files
const { toUpperCase } = require('./route/helperFn');
template.defaults.imports.toUpperCase = toUpperCase;

// config pacakge
const config = require('config');

// set up static files: css, js
app.use(express.static(path.join(__dirname, 'public'))); // absolute path

// set up database connection
require('./model/connect');

// set up session function
const session = require('express-session');
app.use(session({ //secret is used to encript data stored in cookies
    secret: "Our little secret.", // best to use environment variable
    resave: false,
    saveUninitialized: false,
    //cookie: {expires: false} // session expires when browser close
})); 

// block public visitors from blog manage pages
app.use('/admin', require('./middleware/loginGuard'));

// morgan package (middleware) - print client requets
const morgan = require('morgan');
if (process.env.NODE_ENV == 'development') {
    // development
    console.log('Started in Development Mode');
    // print client requests in server console
    app.use(morgan('dev'));

} else {
    // production
    console.log('Started in Production Mode');
}

// set up router step 2
app.use('/home', home);
app.use('/admin', admin);

app.get("/", function (req, res) {
    res.redirect("/home/")
})

// set up error handler middleware
app.use(require('./middleware/errorHandler'));

// set up server's port number
app.listen(process.env.PORT || 3000);