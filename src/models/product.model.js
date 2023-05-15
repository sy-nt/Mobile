"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
const { default: slugify } = require("slugify");

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
    Product.init(
        {
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
            description: DataTypes.TEXT,
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            slug: DataTypes.STRING,
            isDraft: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            isPublished: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            unit: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: [true],
                        msg: "Please enter the unit",
                    },
                },
            },
        },
        {
            engine: "MyISAM",
            sequelize,
            modelName: "Product",
            indexes: [
                {
                    type: "FULLTEXT",
                    fields: ["description", "name"],
                    where: {
                        isPublished: true,
                    },
                },
            ],
            hooks: {
                beforeSave: (product, options) => {
                    if (options.fields.includes("name")) {
                        product.slug = slugify(product.name);
                    }
                },
                beforeCreate: (product) => {
                    product.id = uuidv4();
                },
            },
        }
    );
    return Product;
};
