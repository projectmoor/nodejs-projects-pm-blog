// import Post collection from model folder
const { required } = require('joi');
const { Post } = require('../../model/post');
// import Comment collection from model folder
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    // get post ID
    const id = req.query.id;
    // get error msg (usually from res.redirect in other route file)
    const msg = req.query.msg;
    // get the post by post ID
    const post = await Post.findOne({ _id: id }).populate('author').lean();
    // get all comments by post ID
    const comments = await Comment.find({ pid: id }).populate('uid').sort({publishDate: -1}).lean();
    // render the post page
    res.render('home/post', { post, comments, msg });
};