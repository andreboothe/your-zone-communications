var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const { email, password, recipient } = require('../config');

/* Post email. */
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: email,
           pass: password
       }
   });
  
  const mailOptions = {
    from: email, // sender address
    to: recipient, // list of receivers
    subject: req.body.subject, // Subject line
    html: req.body.text// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      res.status(200).send(err);
    else
      res.status(200).send(info);
 });
});

module.exports = router;