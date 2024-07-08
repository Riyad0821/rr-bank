const { sequelize, Account, Transaction } = require('../models');

async function transferFunds(fromAccountId, toAccountId, amount) {
  const t = await sequelize.transaction();

  try {
    const fromAccount = await Account.findByPk(fromAccountId, { transaction: t });
    const toAccount = await Account.findByPk(toAccountId, { transaction: t });

    if (!fromAccount || !toAccount) {
      throw new Error('Account not found');
    }

    if (fromAccount.balance < amount) {
      throw new Error('Insufficient funds');
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save({ transaction: t });
    await toAccount.save({ transaction: t });

    await Transaction.create({
      fromAccountId,
      toAccountId,
      amount,
      status: 'SUCCESS'
    }, { transaction: t });

    await t.commit();
  } catch (error) {
    await t.rollback();
    await Transaction.create({
      fromAccountId,
      toAccountId,
      amount,
      status: 'FAILED'
    });
    throw error;
  }
}

module.exports = {
  transferFunds
};
