"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init(
        {
            cartId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("pending", "paid"),
                defaultValue: "pending",
            },
            total: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: {
                        args: [0],
                        msg: "totalPrice must be positive number",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Order",
            hooks: {
                beforeCreate: (order, options) => {
                    order.id = uuidv4();
                }
            }
        }
    );
    return Order;
};
