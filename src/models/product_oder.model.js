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
            quantity: DataTypes.INTEGER,
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            discount: DataTypes.STRING,
            thumb: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "ProductOrder",
        }
    );
    return ProductOrder;
};
