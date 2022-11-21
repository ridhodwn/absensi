'use strict';
const {
  Model
} = require('sequelize');
var bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Epresence, {
        foreignKey: 'id_users'
      });
    }
  }
  User.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    npp: DataTypes.STRING,
    npp_supervisor: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword =  bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;
  });
  return User;
};