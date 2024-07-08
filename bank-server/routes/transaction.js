const express = require('express');
const router = express.Router();
const { transferFunds } = require('../services/transactionService');

router.post('/transfer', async (req, res) => {
  const { fromAccountId, toAccountId, amount } = req.body;

  try {
    await transferFunds(fromAccountId, toAccountId, amount);
    res.status(200).send('Transfer successful');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
