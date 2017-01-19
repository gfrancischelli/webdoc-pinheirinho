exports = module.exports = function(req, res, next) {

  const params = req.params;

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.set('Content-Type', 'application/pdf');

  const rootPath = process.env.ENV == 'production'
    ? './applications/webdoc/current/uploads/pdf' 
    : './uploads/pdf';

  const filePath = `${rootPath}/${params.fileName}`;

  console.log('filePath, ', filePath)
  res.download(filePath);
}
