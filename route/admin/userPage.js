// grab User collection from model folder
const { User } = require('../../model/user');

module.exports = async(req, res) => {
    req.app.locals.currentLink = 'user'; // used in sideMenu.art to toggle User & Post tab style

    // which page the user requests
    // if no page param or page<1, set page = 1 
    // let page = req.query.page ? req.query.page < 1 ? 1 : req.query.page : 1;
    let page = !req.query.page || req.query.page < 1 ? 1 : req.query.page;
    // how many items per page
    let pagesize = 5;
    // total number of items
    let count = await User.countDocuments({});
    // total number of pages
    let total = Math.ceil(count / pagesize);
    let start = (page - 1) * pagesize;
    // query users
    let users = await User.find().limit(pagesize).skip(start);
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });
}