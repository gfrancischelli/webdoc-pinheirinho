const sanitizeHtml = require('sanitize-html');
const keystone = require('keystone'),
      Gallery = keystone.list('Gallery');

exports = module.exports = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  Gallery.paginate({
    page: req.query.page || 1,
    perPage: 8,
  })
  .exec(function(err, results) {
    if (err) {
      res.json( {status: err} );
    } else {
      res.json(results);
    }
  });
}
  
