"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const EXPRIRE_TIME = 10;

module.exports = (sequelize, DataTypes) => {
    class OTP extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OTP.init(
        {
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expireIn: {
                type: DataTypes.DATE,
            },
        },
        {
            hooks: {
                beforeCreate: (OTP) => {
                    OTP.id = uuidv4();
                    OTP.expireIn =
                        new Date().getTime() + EXPRIRE_TIME * 60 * 1000;
                },
            },
            sequelize,
            modelName: "OTP",
        }
    );
    return OTP;
};
