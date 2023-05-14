'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Discount.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        type: DataTypes.ENUM("fixed_amount", "percentage"),
        value: DataTypes.INTEGER,
        code: DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        max_uses: DataTypes.INTEGER,
        uses_count: DataTypes.INTEGER,
        max_uses_per_user: DataTypes.INTEGER,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        applies_to: DataTypes.ENUM("all", "specific"),
        product_ids: DataTypes.JSON,
    }, {
        sequelize,
        modelName: 'Discount',
    });
    return Discount;
};