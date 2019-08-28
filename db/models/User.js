const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    class user extends Sequelize.Model {}
    user.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please give a value for "First Name".'
                },
                notEmpty: {
                    msg: 'Please give a value for "First Name".'
                }
            }
        },

        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please give a value for "Last Name".'
                },
                notEmpty: {
                    msg: 'Please give a value for "Last Name".'
                }
            } 
        },

        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please give a value for "Email Address".'
                },
                notEmpty: {
                    msg: 'Please give a value for "Email Address".'
                },
                isEmail: {
                    msg: "Please give a valid Email Address"
                }
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please give a value for "Password".'
                },
                notEmpty: {
                    msg: 'Please give a value for "Password".'
                }
            }
        }
    }, {
        sequelize
    });

    return user;
}