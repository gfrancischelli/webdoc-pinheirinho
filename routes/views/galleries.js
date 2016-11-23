const keystone = require('keystone'),
      Gallery = keystone.list('Gallery');

exports = module.exports = function(req, res) {
    
    const view = new keystone.View(req, res),
          locals = res.locals;

    locals.data = [];
    locals.title = 'Galerias';

    view.on('init', function(next) {
        Gallery.model
        .find()
        .sort('-publishedDate')
        .exec(function(err, results) {
            locals.data.galleries = results;
            next(err);
        })
    });

    view.render('galleries/index')
}
