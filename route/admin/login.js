// set up user login function - validate form data, check user info, set up login session
// import user collection method
const { User } = require('../../model/user');

// import bcrypt package to encrypt password
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    // get loginForm data
    const { email, password } = req.body;
    // user didn't enter email or password
    if (email.trim().length == 0 || password.trim().length == 0) {
        // status code 400 - client request not good
        // add return to prevent program from running down
        // return res.status(400).send('<h4>Sorry, wrong email or password!</h4>');
        return res.status(400).render('admin/error', { msg: 'Sorry, wrong email or password!' });
    }
    // find user according to email address
    // if user found, user = {}
    // if user not found, user = null;
    let user = await User.findOne({ email });
    // user found
    if (user) {
        // check password
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            // login succeed
            // save username to session on server, req.session method is provided by express-session
            req.session.username = user.username;
            // save user role to session on server
            req.session.role = user.role;
            // save user data to app.locals so that every template can assess it by {{userInfo}}
            // userInfo is also used to check user login state
            // we can get app from req.app, which is the same app = express() we have in app.js
            req.app.locals.userInfo = user;
            // if user role is admin, jump to user manage page
            if (user.role == 'Admin') {
                res.redirect('/admin/user');
            } else {
                res.redirect('/home/');
            }

        } else {
            // login failed
            return res.status(400).render('admin/error', { msg: 'Sorry, wrong email or password!' });
        }
    } else {
        // user not found
        return res.status(400).render('admin/error', { msg: 'Sorry, wrong email or password!' });
    }
}