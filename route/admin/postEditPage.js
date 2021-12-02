const { Post } = require('../../model/post');
const dateFormat = require('dateformat');

module.exports = async(req, res) => {
    // msg is error msg injected by middleware/errorHandler
    // id is added by the request from the <a> for post edit on post.art page
    const { msg, id } = req.query; 

    if (id) {
        // then it is editing event
        let post = await Post.findOne({ _id: id }).populate('author').lean();
        // console.log(dateFormat(post.publishDate, 'mm/dd/yyyy'));
        res.render('admin/post-edit', { post, msg, button: 'Edit', link: '/admin/modify-post?id=' + id });
    } else {
        // adding post event
        res.render('admin/post-edit', { msg, button: 'Add', link: '/admin/add-post' });
    }
}