const Sequelize = require('sequelize');

module.exports =  (sequelize, Sequelize) => {
    const good = sequelize.define('Good', {
        name: {
            type: Sequelize.STRING(40),
            allowNull: false,
        },
        img: {
            type: Sequelize.STRING(200),
            allowNull: true,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: 'Good',
        tableName: 'goods',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    good.associate = function(db) {
        db.Good.belongsTo(db.User, {as : 'Owner' });
        db.Good.belongsTo(db.User, {as : 'Sold' });
        db.Good.hasMany(db.Auction);
    }


    return good;
};