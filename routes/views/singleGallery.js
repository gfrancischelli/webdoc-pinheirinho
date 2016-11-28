const keystone = require('keystone'),
      Gallery =  keystone.list('Gallery');

exports = module.exports = function(req, res) {
    
    const view = new keystone.View(req, res),
          params = req.params,
          locals = res.locals;

    locals.data = [];

    view.on('init', function(next) {
        Gallery.model
            .findOne({ slug: params.gallerySlug })
            .exec(function(err, result) {
                if (result != null) {
                    locals.data.gallery = result;
                    console.log(result);
                } else {
                    return res.status(404)
                        .send(keystone.wraPhtmleRROR('Galeria não encontrado! (404)'))
                }
                next(err);
            });
    });

    view.render('galleries/singleGallery');
}
