// grab Post collection build function and validation function
const { Post, validatePost } = require('../../model/post');

// grab formidable module to support file upload
// if there is file to upload, form data must be presented in binary format
const formidable = require('formidable');

// support absolute file directory
const path = require('path');

module.exports = async(req, res, next) => {
    // 1 get form parser object
    const form = new formidable.IncomingForm();

    // 2 set up file upload directory in absolute path
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');

    // 3 keep file extension
    form.keepExtensions = true;

    form.parse(req, async(err, fields, files) => {
        const data = {
            // mongoose schema's default setting will only be called if value is undefined
            // here when no date is picked by user, input value will be '' instead of undefined
            // thus we manually change '' to undefined, so that mongoose will add default value
            category: fields.category == '' ? undefined : fields.category,
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate == '' ? undefined : fields.publishDate,
            // files.cover.path will be the absoule path on the server machine, we only need relative path of the file to the domain/public
            cover: files.cover.path.split('public')[1], // \uploads\filename.ext
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

        await Post.create(data);
        res.redirect('/admin/post');
    })
}