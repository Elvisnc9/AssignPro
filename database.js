const { Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'staff_management_db',
    'root',
    'Ngwudalu12345.',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '4939'
    }
);

sequelize
    .authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;