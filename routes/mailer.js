const secrets = require('../secrets.json');
const Mailgun = require('mailgun-js');

exports = module.exports = function(req, res) {

    const mailgun = new Mailgun(secrets.mailgun_auth);

    const sender_name = req.body.FullName;
    const sender_address = req.body.Email;
    const mail_subject = req.body.Subject;
    const mail_content = req.body.Content;

    const data = {
        from: 'Webdoc Pinheirinho <postmaster@sandbox15deb2d8f5b14ad293686e5c8d9a88f7.mailgun.org>',
        to: secrets.mail_to,
        subject: mail_subject,
        text: mail_content,
    };

    mailgun.messages().send(data, function(error, body) {
        
        if (error) {
            console.log('Error sending email: ', error);
            res.send(error);
        } else {
            console.log('Mail sent sucessfully: ', body);
            res.send(body);
        }
    });
}
