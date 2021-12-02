// grab User collection from model folder
const { User } = require('../../model/user');

module.exports = async(req, res) => {
    try {
        await User.deleteOne({ _id: req.query.id });
        res.redirect('/admin/user');
    } catch (e) {
        return res.status(400).render('admin/error', { msg: e.message });
    }
}