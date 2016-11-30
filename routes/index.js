const keystone = require('keystone'),
      middleware = require('./middleware'),
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
};

function imageAPI(req, res) {
    const params = req.params,
          fileName = params.filename;

    const options = {
        root: `./public/images/${params.folder}/`,
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
        },
    };

    res.sendFile(fileName, options, function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log(`Image sent: ${fileName}`)
        }
    });
};

exports = module.exports = function(app) {

    app.get('/', routes.views.index);
 
    // TODO - workin titles names
    app.get('/public/images/:folder/:filename', imageAPI);
    // app.get('/public/images/:folder/:title/:filename', imageAPI);

    // News routes
    app.get('/noticias', routes.views.news);
    app.get('/noticias/:postSlug', routes.views.singleNew);

    // Gallery routes
    app.get('/galerias', routes.views.galleries);
    app.get('/galerias/:gallerySlug', routes.views.singleGallery);
}
