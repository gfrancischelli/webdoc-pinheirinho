const keystone = require('keystone'),
      Post = keystone.list('Post');

exports = module.exports = function(req, res) {

    const view = new keystone.View(req, res),
          locals = res.locals;

    locals.data = [];
    locals.title = "Linha do Tempo";

    view.on('init', function(next) {
        Post.model
            .where('tipo', 'timeline')
            .sort('data')
            .exec(function(err, results) {
               console.log(results[1].data)
                locals.posts = results;
                next(err);
            });
    });
    
    view.render('timeline/index')
}
