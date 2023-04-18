var SequelizeAuto = require('sequelize-auto');

var auto = new SequelizeAuto('demo', 'root', '1234', {
    dialect: 'mysql',
    host: 'localhost'
});

auto.run(function (err) {
    if (err) throw err;
});