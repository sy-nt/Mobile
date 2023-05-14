"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ProductCart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ProductCart.init(
        {
            cartId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            quantity: DataTypes.INTEGER,
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            thumb: DataTypes.STRING,
            expiredIn: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "ProductCart",
        }
    );
    return ProductCart;
};
