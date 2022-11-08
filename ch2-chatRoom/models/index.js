const { Sequelize } = require('sequelize');

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
db.Good = require('./good')(sequelize, Sequelize);
db.Auction = require('./auction')(sequelize, Sequelize);


db.user.associate(db);
db.Good.associate(db);
db.Auction.associate(db);

console.log(db);

module.exports = db;