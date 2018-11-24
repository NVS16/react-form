var mongoose = require('mongoose');
var mailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

var options = {
    service: 'gmail',
    secure: true,
    auth: {
        user: 'nvsa16@gmail.com',
        pass: 'Envious@166'
    }
};

var transport = mailer.createTransport(smtpTransport(options));

// Mail sender code 
var sendMail = function (req, res) {
    console.log(req.body);

    var mail = {  // to be set with appropriate req.body attributes
        from:  req.body.name + ' <nvsa16@gmail.com>',
        to: 'eduhiservices@gmail.com',  // should be set to req.body.to
        subject: "Contact Us Form Response" ,
        html: "<p>" + req.body.message + "</p><br><br>Name: " + req.body.name + "<br><p>All correspondences should be replied to the sender email - <b>" + req.body.email + "</b></p>"
    }

   transport.sendMail(mail, (error, response) => {
        transport.close()
        if (error) {
            res.json({ msg: "Mailing Error : " + error });
        } else {
            res.json({ msg: 'Mail Sent' });
        }
    })  


}

module.exports = {
    "sendMail": sendMail
}