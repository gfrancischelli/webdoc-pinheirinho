const keystone = require('keystone'),
      Post = keystone.list('Post');

exports = module.exports = function(req, res) {

    const view = new keystone.View(req, res),
          locals = res.locals;

    locals.data = [];
    locals.title = "Notícias";

    view.on('init', function(next) {
        Post.paginate({
                page: req.query.page || 1,
                perPage: 10,
                maxPages: 10,
            })
            .where('status', 'publicado')
            .sort('-publishedAt')
            .exec(function(err, results) {
                locals.data.news = results;
                next(err);
            });
    });
    
    view.render('news/index')
}
