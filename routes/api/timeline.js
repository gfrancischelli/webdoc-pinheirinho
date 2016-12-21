const keystone = require('keystone'),
      Post = keystone.list('Post');

exports = module.exports = function(req, res) {

    let news;

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

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
