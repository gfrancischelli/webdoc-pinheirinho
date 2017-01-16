const sanitizeHtml = require('sanitize-html');
const keystone = require('keystone'),
      New = keystone.list('New');

exports = module.exports = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  New.paginate({
    page: req.query.page || 1,
    perPage: 1,
  })
  .where('status', 'publicado')
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
