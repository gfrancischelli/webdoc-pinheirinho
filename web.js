require('dotenv').config();

const keystone = require('keystone')

keystone.init({

    'name': 'webdoc',

    // 'favicon': 'public/favicon.ico', 
    'sass': 'public', 
    'static': ['public'], 

    'cloudinary config': process.env.CLOUDINARY_CONFIG,

    'views': 'templates/views',
    'view engine': 'pug',

    'auto update': true, 
    'mongo': 'mongodb://localhost/webdoc', 

    'session': true,
    'auth': true, 
    'user model': 'User', 
    'cookie secret': process.env.COOKIE_SECRET, 

});

require('./models');

keystone.set('routes', require('./routes'));

keystone.start();
