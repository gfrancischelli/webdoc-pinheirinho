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

    // Mail
    app.post('/api/mail', mailer);
 
    // Imagemagick currently not working in production.
    // TODO FIX IMAGEMAGICK
    if ( process.env.ENV == 'production' ) {
      app.get('/api/images/:folder/:fileName', images);
    } else {
      app.get('/api/images/:folder/:fileName', routes.api.images);
    }

    app.get('/api/images/galleries/:albumname/:filename', routes.api.galleryImages)

    // Single Item
    app.get('/api/unique/:resource/:slug', routes.api.singleItem)
    
    // Timeline
    app.get('/api/news', routes.api.news);
    app.get('/api/timeline', routes.api.timeline);
    app.get('/api/galleries', routes.api.galleries);
  

    // Files
    app.get('/api/pdf/:fileName', routes.api.pdf);

    app.get('/api/:data/complete', routes.api.data)

    // React
    app.get(/(?!api)/, routes.views.index);
}
