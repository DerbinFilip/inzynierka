const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./model.js")(sequelize, Sequelize);
db.qrtabs = require("./model_2.js")(sequelize, Sequelize);
db.tutorials.hasMany(db.qrtabs, { as: "qrtabs" });
db.qrtabs.belongsTo(db.tutorials, {
  foreignKey: "authorId",
  // as: "users"
});
module.exports = db;
