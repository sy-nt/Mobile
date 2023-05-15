"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        args: [true],
                        msg: "Please enter your name",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    is: {
                        args: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g],
                        msg: "Please enter suitable email",
                    },
                },
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: {
                        args: [6],
                        msg: "Minimum password length is 6 characters",
                    },
                    notEmpty: {
                        args: [true],
                        msg: "Please enter a password",
                    },
                    notNull: {
                        args: [true],
                        msg: "Please enter a password",
                    },
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [[10, 11]],
                        msg: "Please enter suiable phone number",
                    },
                    notEmpty: {
                        args: [true],
                        msg: "Please enter a phone number",
                    },
                    notNull: {
                        args: [true],
                        msg: "Please enter a phone number",
                    },
                },
            },
            verify: DataTypes.BOOLEAN,
            roles: {
                type: DataTypes.ENUM("0001", "0010", "0100"),
                defaultValue: "0100",
            },
            image: {
                type: DataTypes.TEXT,
                defaultValue:
                    "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
            },
        },
        {
            hooks: {
                beforeSave: (user, options) => {
                    if (options.fields.includes("password")) {
                        user.password = bcrypt.hashSync(user.password, 10);
                    }
                },
                beforeCreate: (user, options) => {
                    user.id = uuidv4();
                },
            },
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
