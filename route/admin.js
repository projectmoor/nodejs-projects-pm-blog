// import express.Router method for router function
const express = require('express');
const admin = express.Router();

// all admin related route files live in ./admin folder
// render login page
admin.get('/login', require('./admin/loginPgae'));

// set up login function
admin.post('/login', require('./admin/login'));

// set up logout function 
admin.get('/logout', require('./admin/logout'));

// render user page
admin.get('/user', require('./admin/userPage'));

// render add/edit user page
admin.get('/user-edit', require('./admin/userEditPage'));

// set up add user function 
admin.post('/add-user', require('./admin/addUser'));

// set up modify user function
admin.post('/modify-user', require('./admin/modifyUser'));

// set up delete user function
admin.get('/delete-user', require('./admin/deleteUser'));

// render post page
admin.get('/post', require('./admin/postPage'));

// render add/edit post page
admin.get('/post-edit', require('./admin/postEditPage'));

// set up add post function
admin.post('/add-post', require('./admin/addPost'));

// set up modify post function
admin.post('/modify-post', require('./admin/modifyPost'));

// set up delete post function 
admin.get('/delete-post', require('./admin/deletePost'));

module.exports = admin;