const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Good = require('./good')(sequelize, Sequelize);
db.Auction = require('./auction')(sequelize, Sequelize);

// db.user.init(sequelize);
// db.Good.init(sequelize);
// db.Auction.init(sequelize);

db.User.associate(db);
db.Good.associate(db);
db.Auction.associate(db);

console.log('DB 설정 : ', db);

module.exports = db;