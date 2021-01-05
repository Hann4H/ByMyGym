var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');

nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.REACT_APP_ADMIN_EMAIL,
      pass: process.env.REACT_APP_ADMIN_PASS
    }
  });

  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `  
    var mail = {
      from: name,
      to: "bemygym@gmail.com",
      text: content
    }  
    
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  })