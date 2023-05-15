"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Cart.init(
        {
            status: DataTypes.ENUM("active", "completed", "failed", "inactive"),
            count_product: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
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
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: "Cart",
        }
    );
    return Cart;
};
