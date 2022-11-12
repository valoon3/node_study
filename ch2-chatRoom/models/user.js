const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) =>  {
     const user =  sequelize.define('User', {
        email: {
            type: Sequelize.STRING(40),
            allowNull: false,
            unique: true,
        },
        nick: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        money: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        sequelize,
        timestamps: true,
        paranid: true,
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

     user.associate = function(db) {
         user.hasMany(db.Auction);
     }

     return user;
}