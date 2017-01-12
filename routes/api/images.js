const gm = require('gm').subClass({imageMagick: true});

exports = module.exports = function(req, res, next) {

  const params = req.params;
  const newWidth = req.query.width;

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.set('Content-Type', 'image/jpg');

  const rootPath = process.env.ENV == 'production'
    ? './applications/webdoc/current/public/images' 
    : './public/images';

  const filePath = `${rootPath}/${params.folder}/${params.fileName}`;

  console.log('path: \n', filePath)
  console.log('name: ', params.fileName)

  gm(filePath)
    .resize( newWidth )
    .stream(function(err, stdout, stderr) {
        if(err) return next(err);
        stdout.pipe(res);


        stdout.on('error', next)
    })
}
