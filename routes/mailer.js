const keystone = require('keystone'),
      nodemailer = require('nodemailer'),
      secrets = require('../secrets.json');

function handlerEmailRequest(req, res) {

    const transporter = nodemailer.createTransport({
        service: secrets.mail_service,
        auth: secrets.mail_auth,
    });
}


exports = module.exports = function(req, res) {
    
    const sender_name = req.body.name;
    const sender_adress = req.body.mail;
    const mail_content = req.body.message;
    
    const mailOptions = {
        from: sender_adress,
        to: 'gifrancischelli@gmail.com',
        subject: 'Webdoc Pinheirinho',
        text: mail_content,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
            res.json({status: 'error'});
        } else {
            console.log(`Message sent: ${info.response}`);
            res.json({status: 'success'});
        }
    });
}
