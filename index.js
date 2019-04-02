const express = require('express');
const cors = require('cors');
const charge = require('./charge');

const app = express();
app.use(require('body-parser').text());

app.use(cors());
app.use(express.json());
app.use('/charge', charge);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
