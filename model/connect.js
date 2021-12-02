// connect to database

// import mongoose package
const mongoose = require('mongoose');
// import config pacakget
const config = require('config');

// connect to database
if (process.env.NODE_ENV == 'development') {
    mongoose.connect('mongodb://localhost:27017/pm-blog', { useNewUrlParser: true, useUnifiedTopology: true } );

} else {
    mongoose.connect(`mongodb+srv://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Failed to connect to database'))
}
