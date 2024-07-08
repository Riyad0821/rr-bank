const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transaction');

const app = express();
app.use(bodyParser.json());
app.use('/api/transaction', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
