const bcrypt = require('bcrypt');

async function encryptStr(str) {
    let salt = await bcrypt.genSalt(10); // .genSalt method returns a promise object
    let result = await bcrypt.hash(str, salt);
    return result;
}

module.exports = {
    encryptStr
}