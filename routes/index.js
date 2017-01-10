const keystone = require('keystone'),
      mailer = require('./mailer'),
      middleware = require('./middleware'),
      images = require('./images'),
      importRoutes = keystone.importer(__dirname);

// CommonMiddleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function(req, res, next) {
   res.notfound();
});

// Handle other errors
keystone.set('500', function(err, req, res, next) {
   let title, message;

   if (err instanceof Error) {
        message = err.message;
        err = err.stack;
   }

   console.log(message)
   res.err(err, title, message);
});

// Load Routes
const routes = {
    views: importRoutes('./views'),
    api: importRoutes('./api'),
};

exports = module.exports = function(app) {


    // API
    // TODO - workin titles names
    // app.get('/public/images/:folder/:title/:filename', imageAPI);
    app.get('/imgs/:folder/:filename', images);

    // Mail
    app.post('/api/mail', mailer);

    // Single Item
    app.get('/api/unique/:resource/:slug', routes.api.singleItem)
  
    // Timeline
    app.get('/api/:content', routes.api.index);

    // React
    app.get(/(?!api)/, routes.views.index);
}
