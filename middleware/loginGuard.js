// block visitors from blog manage pages

const guard = (req, res, next) => {
    // check if user visit login page
    // check user's login status, if logined pass req to next app.use, if not redirect to login page
    if (req.url != '/login' && !req.session.username) {
        // user not logined, redirect
        res.redirect('/admin/login');
    } else {
        // normal user logined
        if (req.session.role == 'normal') {
            return res.redirect('/home/');
        }
        // admin user logined, pass request to next app.use
        next();
    }
}

module.exports = guard;