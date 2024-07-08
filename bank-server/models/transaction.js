module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      fromAccountId: DataTypes.INTEGER,
      toAccountId: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
      status: DataTypes.STRING
    });
    Transaction.associate = function(models) {
      Transaction.belongsTo(models.Account, { as: 'FromAccount', foreignKey: 'fromAccountId' });
      Transaction.belongsTo(models.Account, { as: 'ToAccount', foreignKey: 'toAccountId' });
    };
    return Transaction;
  };
  