var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');

var transport = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: "bemygym@gmail.com",
      pass: "BeMyGym123!"
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/sendNotifs', (req, res, next) => {
  var name = req.body.name
  var surname = req.body.surname
  var email = req.body.email
  var gymName = req.body.gymName

  var content = `Twoja sala została zarezerwowana!\n${name} ${surname} zarezerwował/a salę ${gymName}. Zaakceptuj lub odrzuć rezerwację!`

  var mail = {
    from: 'bemygym@gmail.com',
    to: email,  
    subject: 'Rezerwacja sali',
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

const app = express()

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(4444)