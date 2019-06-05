const express = require('express');
const cors = require('cors');
const charge = require('./charge');
const email = require('./email');
const chargetest = require('./chargetest');
require('dotenv').config();

const app = express();
app.use(require('body-parser').text());

app.use(cors());
app.use(express.json());
app.use('/charge', charge);
app.use('/email', email);
app.use('/chargetest', chargetest);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
