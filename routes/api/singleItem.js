const keystone = require('keystone');
const sanitizeHtml = require('sanitize-html');

exports = module.exports = function(req, res) {

  let Model;
  const type = req.params.resource;
  const slug = req.params.slug;

  switch(type) {
    case 'news':
      Model = keystone.list('New').model;
      break;
    case 'galleries':
      Model = keystone.list('Gallery').model;
      break;
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  Model
    .findOne({ slug: slug })
    .exec(function(err, result) {
      if (!result) {
        res.json({status: 'document not found'});
      } else {
        if (result.content) result.content = sanitizeHtml(result.content);
        err ? res.json({status: err}) : res.json(result);
      }
    });
}
