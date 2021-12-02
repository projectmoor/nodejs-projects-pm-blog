const { Post } = require('../../model/post');
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // console.log('userInfo', req.app.locals.userInfo)
    // console.log('session', req.session.username)
    const page = req.query.page;
    const id = req.params.id;
    

    let posts = await pagination(Post).page(page).size(5).display(5).find({category: id}).populate('author').sort({publishDate: -1}).exec();
    
    posts = JSON.parse(JSON.stringify(posts));

    const categories = {
        'web-design': 'Web Design',
        'javascript': 'Javascript',
        'nodejs': 'Node.js'
    }
    const category = categories[id]

    res.render('home/default', { posts, category, id });
}