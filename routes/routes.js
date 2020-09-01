#!/usr/bin/env node
const nodemailer = require("nodemailer");

var appRouter = function (app) {
  app.get("/", function (req, res) {
    res.status(200).send("Welcome to our restful API");
  });

  app.post("/mail", function (req, res) {
    console.log(req.body);

    const smtpConfig = {
      host: "", // smtp.gmail.com
      secure: false, // true for 465, false for other ports
      port: 587,
      auth: {
        user: "", // example@gmail.com
        pass: ""
      }
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(smtpConfig);

    // setup email data with unicode symbols
    let mailOptions = {
      from: req.body.email, // sender email address
      to: 'example@example.com', // list of receivers
      subject: req.body.subject, // Subject line
      text: '', // plain text body
      html: 'from: ' + req.body.email + '<br><br> name: ' + req.body.name + '<br><br> message' + req.body.message, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent:', info );
    });

    res.json(req.body);
  });
}

module.exports = appRouter;