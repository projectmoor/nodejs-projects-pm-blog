module.exports = (req, res) => {
    // delete session
    req.session.destroy(function() {
        // delete cookie
        res.clearCookie('connect.sid');
        req.app.locals.userInfo = null;
        // jump to home page
        res.redirect('/home/');
    })
}