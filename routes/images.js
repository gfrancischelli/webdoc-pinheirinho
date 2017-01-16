const path = require('path');

exports = module.exports = function(req, res) {

  const fileName = req.params.fileName;
  
  var options = {
    root: path.join(__dirname, `../uploads/images/${req.params.folder}`),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });

}
