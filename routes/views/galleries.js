const keystone = require('keystone'),
      Gallery = keystone.list('Gallery');

exports = module.exports = function(req, res) {
    
    const view = new keystone.View(req, res),
          locals = res.locals;

    locals.data = [];
    locals.title = 'Galerias';

    view.on('init', function(next) {
        Gallery.paginate({
            page: req.query.page || 1,
            perPage: 10,
            maxPages: 10,
        })
        .sort('-createdAt')
        .exec(function(err, results) {
            locals.data.galleries = results;
            next(err);
        });
    });

    view.render('galleries/index');
    
}
