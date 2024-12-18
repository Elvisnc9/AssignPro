const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Staff = sequelize.define('Staff', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('full-staff', 'intern'),
        allowNull: false,
    },
       
    assignedDays: {
        type: DataTypes.JSON, 
        allowNull: true,
    },
    month: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Staff;
