'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Epresence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Epresence.belongsTo(models.User, {
        foreignKey: 'id_users'
      });
    }
  }
  Epresence.init({
    id_users: DataTypes.INTEGER,
    type: DataTypes.STRING,
    is_approve: DataTypes.BOOLEAN,
    waktu: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Epresence',
  });
  return Epresence;
};