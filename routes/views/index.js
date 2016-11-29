const keystone = require('keystone'),
        Post = keystone.list('Post'),
        Gallery = keystone.list('Gallery');

exports = module.exports = function(req, res) {

    const locals = res.locals,
          view = new keystone.View(req, res);

    locals.data = [];
    locals.title = "home";
    
    view.on('init', function(next) {
        Post.model
            .find()
            .limit(3)
            .where('status', 'publicado')
            .sort('-publishedAt')
            .exec(function(err, results) {
                locals.data.news = results;
                next(err);
            });
    });


    view.render('index');

}
