var email = require('mailer');
var express = require('express');
var app = express();


app.get('/', function(req, res) {
    var messageBody = ""
    for (var k in req.body) {
        if (typeof target[k] !== 'function') {
            messageBody += k + ": " + target[k] + '\n \n';
        }
    }

    var to = req.body && req.body.to ? req.body.to : "paulochrocha@gmail.com";
    var from = req.body && req.body.from ? req.body.from : "paulochrocha@gmail.com";
    var subject = req.body && req.body.subject ? req.body.subject : "Test email";

    email.send({
            host: process.env.MAIL_SERVER || "localhost", // smtp server hostname
            port: process.env.MAIL_PORT || "25", // smtp server port
            ssl: process.env.MAIL_SSL || false,
            domain: process.env.MAIL_DOMAIN || "localhost", // domain used by client to identify itself to server
            to: process.env.MAIL_TO || to,
            from: process.env.MAIL_FROM || from,
            subject: process.env.MAIL_SUBJECT || subject,
            body: messageBody,
            authentication: process.env.MAIL_AUTH || "login", // auth login is supported; anything else is no auth
            username: process.env.MAIL_USERNAME || "username",
            password: process.env.MAIL_PASSWORD || "password"
        },
        function(err, result) {
            if (err) {
                console.log(err);
                res.send(401, 'Erro no envio do e-mail');

            } else {
                res.send(200, 'E-mail enviado com sucesso');
            }
        });
});

app.listen(8000, function() {
    console.log('Example app listening on port 8000!');
});
