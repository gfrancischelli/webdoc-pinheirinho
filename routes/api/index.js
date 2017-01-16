const sanitizeHtml = require('sanitize-html');
const keystone = require('keystone'),
      Post = keystone.list('Post');

exports = module.exports = function(req, res) {

  let news;
  let where_prop, where_val, sort_param;

  switch (req.params.content) {
    case 'timeline':
      where_prop = 'tipo';
      where_val = 'timeline';
      sort_param = 'data';
      break;
    case 'news':
      where_prop = 'status';
      where_val = 'publicado';
      sort_param = '-publishedAt';
      break;
    case 'galleries':
      where_prop = '';
      where_val = '';
      sort_param = '-publishedAt';
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  Post
    .paginate({
      page: req.query.page || 1,
      perPage: 1,
    })
    .where(where_prop, where_val)
    .sort(sort_param)
    .exec(function(err, results) {
      news = results;
      news.results.forEach( post => post.content = sanitizeHtml(post.content) );
      
      err ? res.json({status: err}) : res.json(news);
  });
}
