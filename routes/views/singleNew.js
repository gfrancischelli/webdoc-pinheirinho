const keystone = require('keystone'),
      Post = keystone.list('Post');

exports = module.exports = function(req, res) {

    const view = new keystone.View(req, res),
          params = req.params,
          locals = res.locals;

    locals.data = [];

    view.on('init', function(next) {
        Post.model
            .findOne({ slug: params.postSlug })
            .exec(function(err, result) {
                if (result != null) {
                    locals.data.post = result;
                } else {
                    return res.status(404)
                        .send(keystone.wrapHTMLError('Ticket não encontrado! (404)'));
                }
                next(err);
            });
    });

    view.render('news/singlenew');
}
