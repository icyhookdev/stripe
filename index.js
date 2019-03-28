const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys_prod');
const stripe = require('stripe')(keys.stripeSecretKey);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', {
    stripePublishableKey: keys.stripePublishableKey,
  });
});

app.post('/charge', (req, res) => {
  const { amount } = req.body;

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: 'Web Development Ebook',
        currency: 'usd',
        customer: customer.id,
      })
    )
    .then(charge => console.log('works'));
});

const port = process.env.PORT || 5000;
app.use(cors());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
