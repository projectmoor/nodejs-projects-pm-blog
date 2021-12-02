const path = require('path');
const express = require('express');
const home = express.Router();

// render home page
home.get('/', require('./home/indexPage'));

// post list by category
home.get('/category/:id', require('./home/listPage'));

// render post page
home.get('/post', require('./home/postPage'));

// set up add comment function 
home.post('/add-comment', require('./home/addComment'));

module.exports = home;