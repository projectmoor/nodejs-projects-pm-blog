// grab User collection build function 
const { User } = require('../../model/user');
// import bcrypt package to encrypt password
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    const { username, email, password, role, state } = req.body;
    const id = req.query.id;

    let user = await User.findOne({ _id: id });
    let isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        await User.updateOne({ _id: id }, {
            username,
            email,
            role,
            state
        });
        res.redirect('/admin/user');
    } else {
        return next(JSON.stringify({ path: '/admin/user-edit', msg: 'Wrong password!', id: id }));
    }
}