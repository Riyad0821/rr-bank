module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: DataTypes.STRING,
      email: DataTypes.STRING
    });
    User.associate = function(models) {
      User.hasMany(models.Account);
    };
    return User;
  };
  