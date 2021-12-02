const { Comment, validateComment } = require('../../model/comment');

module.exports = async(req, res) => {
    const comment = {
        pid: req.body.pid,
        uid: req.body.uid,
        publishDate: Date.now(),
        content: req.body.content
    }
    // console.log(comment);
    try {
        await validateComment(comment);
        await Comment.create(comment);
        return res.redirect(`/home/post?id=${comment.pid}`)
    } catch (e) {
        return res.redirect(`/home/post?id=${comment.pid}&msg=${e.message}`);
    }
}