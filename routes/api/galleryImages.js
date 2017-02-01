const gm = require('gm').subClass({imageMagick: true});

const path = require('path');

exports = module.exports = function(req, res) {

  const { filename, albumname } = req.params
  
  var options = {
    root: path.resolve(__dirname, `../../uploads/images/galleries/${albumname}`),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  res.sendFile(filename, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', filename);
    }
  });

}
