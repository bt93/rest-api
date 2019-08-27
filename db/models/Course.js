const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
    Course.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        userId: {
            type: Sequelize.INTEGER
        },

        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please give a value for "Title".'
                },
                notEmpty: {
                    msg: 'Please give a value for "Title".'
                }
            }
        },

        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please give a value for "Description".'
                },
                notEmpty: {
                    msg: 'Please give a value for "Description".'
                }
            }
        },
        
        estimatedTime: {
            type: Sequelize.STRING
        },

        materialsNeeded: {
            type: Sequelize.STRING
        }
    }, {
        sequelize
    });

    return Course;
}