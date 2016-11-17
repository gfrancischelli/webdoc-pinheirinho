const keystone = require('keystone'),
      User = keystone.list('User');

exports = module.exports = function(done) {

    new User.model({
        name: { first: 'Admin', last: 'User' },
        email: 'admin@sample.com',
        password: 'admin',
        canAccessKeystone: true,
    }).save(done);

};
