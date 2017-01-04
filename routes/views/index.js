const keystone = require('keystone'),
      Post = keystone.list('Post'),
      Gallery = keystone.list('Gallery'),
      sanitizeHtml = require('sanitize-html');

function queryRecent(model, limit = 3) {
    const q = model.find()
        .limit(limit)
        .sort('-publishedAt')

    if (model.schema.paths.status) q.where('status', 'publicado');

    return new Promise(function(resolve, reject) {
        q.sort('-publishedAt')
            .exec(function(err, results) {
                if (results != null) resolve(results);
                reject(err);
            });
    });
}

exports = module.exports = function(req, res) {

  const locals = res.locals,
    view = new keystone.View(req, res);

  locals.data = {};
  locals.title = "home";
    
  view.on('init', function(next) {
    Promise.all([queryRecent(Post.model), queryRecent(Gallery.model)])
      .then(function([news, galleries]) {
        news.forEach( post => post.content = sanitizeHtml(post.content) );
        locals.data.news = news;
        locals.data.galleries = galleries;
        next();
      });
  });

  view.render('react');
}
