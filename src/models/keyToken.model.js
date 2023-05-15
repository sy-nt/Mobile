"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class KeyToken extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    KeyToken.init(
        {
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            refreshTokenUsed: DataTypes.JSON,
        },
        {
            sequelize,
            modelName: "KeyToken",
        }
    );
    return KeyToken;
};
