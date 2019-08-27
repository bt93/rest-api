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

// All models here
db.models.User = require('./models/User')(sequelize);
db.models.Course = require('./models/Course')(sequelize);
module.exports = db;