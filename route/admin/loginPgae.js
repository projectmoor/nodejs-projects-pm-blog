// login page render - send views/admin/login.art template
module.exports = (req, res) => {
    // res.sendFile(path.join(__dirname, '../', '/public/admin/login.html'));
    res.render('admin/login')
}