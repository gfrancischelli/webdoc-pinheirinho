const keystone = require('keystone'),
      Post = keystone.list('Post'),
      Gallery = keystone.list('Gallery'),
      sanitizeHtml = require('sanitize-html');

function queryRecent(model, config = {}) {
    const where = config.where || {p: 'status', v: 'publicado'};
    const sort = config.sort || '-publishedAt';
    const limit = config.limit || 3;

    const q = model.find()
        .limit(limit)
        .sort('-publishedAt')

    if (model.schema.paths.status) q.where(where.p, where.v);

    return new Promise(function(resolve, reject) {
        q.sort(sort)
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

  const timeline_config = {
    where: {p: 'tipo', v: 'timeline'},
    sort: 'data',
  }
    
  view.on('init', function(next) {
    Promise.all([
      queryRecent(Post.model),
      queryRecent(Gallery.model),
      queryRecent(Post.model, timeline_config)
    ])
      .then(function([news, galleries, timeline]) {
        news.forEach( post => post.content = sanitizeHtml(post.content));
        timeline.forEach( post => post.content = sanitizeHtml(post.content));
        locals.data.news = news;
        locals.data.galleries = galleries;
        locals.data.timeline = timeline;
        next();
      });
  });

  view.render('react');
}
