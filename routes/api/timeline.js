const keystone = require('keystone'),
      Post = keystone.list('Post');

exports = module.exports = function(req, res) {

    let news;

    // res.set('Content-Type', 'application/json');
    Post.paginate({
          page: req.query.page || 1,
          perPage: 10,
          maxPages: 10,
      })
      .where('tipo', 'timeline')
      .sort('data')
      .exec(function(err, results) {
          news = results;
          err ? res.json({status: err}) : res.json(news);
      });

}
