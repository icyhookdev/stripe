const express = require('express');

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(
  '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'
);

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('hi tehre email');
});

router.post('/', async (req, res) => {
  try {
    const msg = {
      to: req.body.to,
      from: 'noreply@ficsme-4c2d3.firebaseapp.com',
      subject: 'Ficsme Order status',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>
        <br><br>
        <p>Ficsme Team!</p>
      `,
    };
    sgMail.send(msg);
    console.log('email send');
    res.send('Email send');
  } catch (err) {
    res.status(500).end();
    console.log('not send');
    console.log(err);
  }
});

module.exports = router;
