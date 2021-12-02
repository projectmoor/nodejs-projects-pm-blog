const { User } = require('../../model/user');

module.exports = async(req, res) => {
    // msg is error message passed from /middleware/errorHandler.js, for user data validation
    // id is passed from href in the <a> tag in user.art page
    const { msg, id } = req.query; 
    // if there is id param,
    if (id) {
        // then it is editing event
        let user = await User.findOne({ _id: id });
        // console.log(user);
        // render and pass user info to user editing page
        res.render('admin/user-edit', { msg, user, link: '/admin/modify-user?id=' + id, button: 'Edit' });
    } else {
        // if not, it is adding event
        // render user editing page, use it as user adding page
        res.render('admin/user-edit', { msg, link: '/admin/add-user', button: 'Add' });
    }
}