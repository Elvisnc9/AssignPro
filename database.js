const { Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'DB name',
    'ROOT',
    'password',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 
    }
);

sequelize
    .authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
