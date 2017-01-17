const sanitizeHtml = require('sanitize-html');
const keystone = require('keystone'),
      Post = keystone.list('Post');

exports = module.exports = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  Post.paginate({
    page: req.query.page || 1,
    perPage: 8,
  })
  .sort('data')
  .exec(function(err, results) {
    if (err) {
      res.json( {status: err} );
    } else {
      const data = results;
      data.results = data
        .results
        .map( post => {
          post.content = sanitizeHtml(post.content) 
          return post;
        });

      res.json(data);
    }
  });
}
