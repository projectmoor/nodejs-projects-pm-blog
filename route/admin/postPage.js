// grab Post collection build function and validation function
const { Post } = require('../../model/post');
// get pagination package
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // mark current page as post page 
    // this is used in sideMenu.art to toggle User/Post tab style
    req.app.locals.currentLink = 'post';

    // query all posts
    let posts = await pagination(Post).find().populate('author').page(req.query.page).size(2).display(3).exec();
    posts = JSON.parse(JSON.stringify(posts));
    let todayDate = new Date();
    // render all posts
    // console.log(posts);
    res.render('admin/post', {
        posts: posts,
        todayDate
    });
}