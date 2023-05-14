'use strict';
const {
    Model
} = require('sequelize');
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
    Cart.init({
        state: DataTypes.ENUM("active", "completed", "failed"),
        count_product: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expireTime: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};