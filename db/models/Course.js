const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    class course extends Sequelize.Model {}
    course.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    return course;
}