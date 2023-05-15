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
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            thumb: {
                type: DataTypes.STRING,
                defaultValue: `https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png`,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: {
                        args: [0],
                        msg: "Quantity must be positive number",
                    },
                },
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: {
                        args: [0],
                        msg: "Price must be positive number",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "ProductCart",
        }
    );
    return ProductCart;
};
