const Sequelize = require('sequelize');

const sequelize = new Sequelize('demo', 'root', '1234', {
    dialect: 'mysql',
    host: 'localhost',
    timezone: '+05:30',
    logging: false
});

module.exports = sequelize;