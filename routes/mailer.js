const secrets = require('../secrets.json');
const Mailgun = require('mailgun-js');

exports = module.exports = function(req, res) {

    const mailgun = new Mailgun(secrets.mailgun_auth);

    console.log('req.body', req.body);

    const sender_name = req.body.name;
    const sender_address = req.body.address;
    const mail_subject = req.body.subject;
    const mail_content = req.body.content

    const data = {
        from: 'Webdoc Pinheirinho <postmaster@sandbox15deb2d8f5b14ad293686e5c8d9a88f7.mailgun.org>',
        to: secrets.mail_to,
        subject: mail_subject,
        text: mail_content,
    };
    
    mailgun.messages().send(data, function(error, body) {
        if (error) {
            res.json({status: 'error'})
        } else {
            res.json({status: 'success'});
        }
    });
}
