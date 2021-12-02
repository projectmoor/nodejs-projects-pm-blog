// grab encrypt function to encrypt password
const { encryptStr } = require('./helper');
// grab User collection build function and validation function
const { User, validateUser } = require('../../model/user');

module.exports = async(req, res, next) => {
    // validation
    try {
        // pass
        await validateUser(req.body);
    } catch (e) {
        // fail
        // return res.status(400).redirect(`/admin/user-edit?msg=${e.message}`);
        return next(JSON.stringify({ path: '/admin/user-edit', msg: e.message })); // e.message is defined in /model/user.js by Joi
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        // return res.status(400).render('admin/user-edit', { msg: 'Email address has been taken!' });
        // return res.status(400).redirect(`/admin/user-edit?msg=Sorry, email address has been taken!`);
        return next(JSON.stringify({ path: '/admin/user-edit', msg: 'Sorry, email address has been taken!' }));
    }
    // encrypt password when create new user
    let encrypted = await encryptStr(req.body.password);
    req.body.password = encrypted;
    // create new user
    await User.create(req.body);
    // redirect to user page
    res.redirect('/admin/user');
}