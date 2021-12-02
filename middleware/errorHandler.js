module.exports = (err, req, res, next) => {
    const result = JSON.parse(err);
    let query = []; // ['path=fff', 'msg=fff']
    for (let attr in result) {
        if (attr !== 'path') {
            query.push(`${attr}=${result[attr]}`);
        }
    }
    res.status(400).redirect(`${result.path}?${query.join('&')}`);
};