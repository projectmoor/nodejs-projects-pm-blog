// grab Post collection build function and validation function
const { Post, validatePost } = require('../../model/post');

// grab formidable module to support file upload
const formidable = require('formidable');

module.exports = async(req, res, next) => {
    // 1 get form parser object
    const form = new formidable.IncomingForm();

    // 2 set up file upload directory
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');

    // 3 keep file extension
    form.keepExtensions = true;

    form.parse(req, async(err, fields, files) => {
        const id = req.query.id;
        const data = {
            category: fields.category == '' ? undefined : fields.category,
            title: fields.title,
            author: fields.author,
            // mongoose schema's default setting will only be called if value is undefined
            // here when no date is picked by user, input value will be '' instead of undefined
            publishDate: fields.publishDate == '' ? undefined : fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content,
        };

        // validation
        try {
            // pass
            await validatePost(data);
        } catch (e) {
            // fail
            return next(JSON.stringify({ path: '/admin/post-edit', msg: e.message }));
        }

        try {
            // update successfully
            await Post.updateOne({ _id: id }, data);
            res.redirect('/admin/post');
        } catch (e) {
            // update fail
            return next(JSON.stringify({ path: '/admin/post-edit', msg: e.message }));
        }
    });
}