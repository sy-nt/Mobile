"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ProductOrder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ProductOrder.init(
        {
            orderId: {
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
            status: {
                type: DataTypes.ENUM("pending", "return", "sold"),
                defaultValue: "pending",
            },
            productId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "ProductOrder",
        }
    );
    return ProductOrder;
};
