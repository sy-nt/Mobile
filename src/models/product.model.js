'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Product.init({
        name: DataTypes.STRING,
        thumb: DataTypes.STRING,
        description: DataTypes.TEXT,
        quantity: DataTypes.INTEGER,
        category: DataTypes.JSON,
        slug: DataTypes.STRING,
        isDraft: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        unit: {
            type: DataTypes.STRING,
            defaultValue: null
        },
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};