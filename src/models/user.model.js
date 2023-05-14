"use strict";
const { Model } = require("sequelize");
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
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: DataTypes.TEXT,
            phone: {
                type: DataTypes.STRING,
            },
            verify: DataTypes.BOOLEAN,
            roles: {
                type: DataTypes.ENUM("0001", "0010", "0100"),
                defaultValue: "0100",
            },
            image: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
