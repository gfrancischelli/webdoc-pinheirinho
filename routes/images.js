const gm = require('gm');

exports = module.exports = function(req, res) {

    const params = req.params;
    const width = req.query.width;

    console.log('width', width)

    const root = process.env.ENV == 'production' ? './applications/webdoc/current/public' : './public';
    
    const file = `${root}/images/${params.folder}/${params.filename}`;

    res.set('Content-Type', 'image/jpeg');

    gm(file)
        .resize( width )
        .stream(function(err, stdout, stderr) {
            stdout.pipe(res);
        })
}
