const sequelize = require('../database-config');
const {
  DataTypes
} = require('sequelize');

const users = sequelize.define('users', {
  userId: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  emailId: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  userType: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  isLoggedIn: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true
});

module.exports = users;