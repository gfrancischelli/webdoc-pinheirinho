const sanitizeHtml = require('sanitize-html');
const keystone = require('keystone');

exports = module.exports = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  keystone.list(req.params.data)
    .model
    .find()
    .exec(function(err, results) {
      if (err) {
        res.json( {status: err} );
      } else {
        console.log('results \n', results)
        const data = results
          .map( post => {
            post.content = sanitizeHtml(post.content) 
            return post;
          });

        res.json(data);
      }
  });
}
