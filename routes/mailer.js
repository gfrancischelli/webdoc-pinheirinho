const secrets = require('../secrets.json');
const Mailgun = require('mailgun-js');

exports = module.exports = function(req, res) {

    const mailgun = new Mailgun({
        apiKey: "key-851e14dc7571b7b1568f8c054a73fd59", 
        domain: "https://api.mailgun.net/v3/sandbox15deb2d8f5b14ad293686e5c8d9a88f7.mailgun.org/messages", 
    });

    const sender_name = req.body.FullName;
    const sender_address = req.body.Email;
    const mail_subject = req.body.Subject;
    const mail_content = req.body.Content;

    const data = {
        from: 'Mailgun Sandbox <postmaster@sandbox15deb2d8f5b14ad293686e5c8d9a88f7.mailgun.org>',
        to: 'Giovanni <gifrancischelli@gmail.com>',
        subject: "Funcitona em nome de jesus",
        text: "funciona em nome de jesus",
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
