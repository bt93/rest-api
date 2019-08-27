const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'fsjstd-restapi.db'
});

const db = {
    sequelize,
    Sequelize,
    models: {}
}

// TODO: Add models here
// db.models.modelName = require('./models/<name>')(sequelize);
module.exports = db;