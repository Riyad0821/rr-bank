module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
      accountNumber: DataTypes.STRING,
      balance: DataTypes.DECIMAL
    });
    Account.associate = function(models) {
      Account.belongsTo(models.User);
      Account.hasMany(models.Transaction, { as: 'FromAccount', foreignKey: 'fromAccountId' });
      Account.hasMany(models.Transaction, { as: 'ToAccount', foreignKey: 'toAccountId' });
    };
    return Account;
  };
  