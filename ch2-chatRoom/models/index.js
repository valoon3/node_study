const { Sequelize } = require('sequelize');
const user = require('./user');
const Good = require('./good');
const Auction = require('./auction');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

// try {
//     sequelize.authenticate();
//     console.log('Connection has been established sucessfully');
// } catch(err) {
//     console.error('Unable to connect to the database', err);
// }

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.user = require('./user')(sequelize, Sequelize);
db.Good = Good;
db.Auction = Auction;


Good.init(sequelize);
Auction.init(sequelize);

user.associate(db);
Good.associate(db);
Auction.associate(db);

module.exports = db;