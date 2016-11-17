const keystone = require('keystone');

keystone.init({

    'name': 'webdoc',

    // 'favicon': 'public/favicon.ico', 
    'sass': 'public', 
    'static': ['public'], 

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
