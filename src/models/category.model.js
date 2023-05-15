"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Category.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: DataTypes.TEXT,
            thumb: {
                type: DataTypes.STRING,
                defaultValue:
                    "https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg",
            },
        },
        {
            sequelize,
            modelName: "Category",
            hooks: {
                beforeCreate: (category, options) => {
                    category.id = uuidv4();
                },
            },
        }
    );
    return Category;
};
