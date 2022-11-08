const Sequelize = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const auction = sequelize.define('Auction', {
        bid: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        msg: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
    }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Auction',
            tableName: 'auctions',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
    );

    auction.associate = (db) => {
        db.Auction.belongsTo(db.User);
        db.Auction.belongsTo(db.Good);
    }

    return auction;
};