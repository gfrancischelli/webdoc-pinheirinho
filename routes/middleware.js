const _ = require('lodash'),
      keystone = require('keystone');

/**
 * Initialises the standard view locals.
 * Include anything that should be initialised before route controllers
 */
exports.initLocals = function(req, res, next) {
    
    const locals = res.locals;

    locals.user = req.user;

    next();
};

/**
 * Inits the error handler functions into res
*/
exports.initErrorHandlers = function (req, res, next) {

    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            errorTitle: title,
            errorMsg: message,
        });
    };

    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message, 
        })
    }
    
    next();

};

/**
 * Fetches and cleats the flashMessages before a view is rendered
*/
exports.flashMessages = function(req, res, next) {

    const flashMessages = {
        info: req.flash('info')
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error'),
    };

    res.locals.messages = _.some(flashMessages, function(msgs) {
        return msgs.length ? flashMessages : false;
    });

    next();

};
