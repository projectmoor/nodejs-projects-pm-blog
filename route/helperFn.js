// toUpperCase function is used in art template files
const toUpperCase = (str) => {
    if (str == undefined) {
        return 'UNCATEGORIED';
    }
    return String.prototype.toUpperCase.bind(str, null)();
}

module.exports = {
    toUpperCase
}