const keystone = require('keystone');

keystone.init({

    'name': 'webdoc',

    // 'favicon': 'public/favicon.ico', 
    'sass': 'public', 
    'static': ['public'], 

    'cloudinary config': 'cloudinary://441254311745598:H0SiH9NJftgLT6bXFsF14AEwUyc@dp7rd44b2',

    'views': 'templates/views',
    'view engine': 'pug',

    'auto update': true, 
    'mongo': 'mongodb://localhost/webdoc', 

    'session': true,
    'auth': true, 
    'user model': 'User', 
    'cookie secret': "52M336H&7wK9ae%Q0`ID01pTn6@CpD", 

});


require('./models');

keystone.set('routes', require('./routes'));

keystone.start();
