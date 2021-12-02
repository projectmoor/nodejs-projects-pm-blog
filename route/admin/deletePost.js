// grab Post collection from model folder
const { Post } = require('../../model/post');

module.exports = async(req, res) => {
    try {
        await Post.deleteOne({ _id: req.query.id });
        res.redirect('/admin/post');
    } catch (e) {
        return res.status(400).render('admin/error', { msg: e.message });
    }
}