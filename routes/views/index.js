const keystone = require('keystone');


exports = module.exports = function(req, res) {

    const locals = res.locals;

    const view = new keystone.View(req, res);

    locals.title = "Webdoc Pinheirinho";

    view.render('index');

}
