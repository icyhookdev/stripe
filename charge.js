const express = require('express');

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')('sk_test_yHTNEPsJXrwULmg8goBtQu6D');

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('hi tehre');
});

router.post('/', async (req, res) => {
  try {
    const { status } = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      description: 'An example charge',
      source: req.body.token.id,
    });
    console.log(status);
    res.json({ status });
    return true;
  } catch (err) {
    // res.status(500).end();
    res.send(err);
    console.log(err);
  }
});

module.exports = router;
