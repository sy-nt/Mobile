"use strict";

const { Product } = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

class ProductService {
    static setPublishedProduct = async ({ productId }) => {
        const updatedProduct = await Product.update(
            {
                isDraft: false,
                isPublished: true,
            },
            {
                where: {
                    id: {
                        [Op.eq]: productId,
                    },
                },
                attributes: { exclude: ["createdAt", "updatedAt"] },
            }
        );
        return {
            updatedProduct,
        };
    };

    static setDraftProduct = async ({ productId }) => {
        const updatedProduct = await Product.update(
            {
                isDraft: true,
                isPublished: false,
            },
            {
                where: {
                    id: {
                        [Op.eq]: productId,
                    },
                },
                attributes: { exclude: ["createdAt", "updatedAt"] },
            }
        );
        return {
            updatedProduct,
        };
    };

    static getAllPublishedProduct = async () => {
        const products = await Product.findAll({
            where: {
                isPublished: {
                    [Op.eq]: true,
                },
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return {
            products: JSON.parse(JSON.stringify(products, null, 2)),
        };
    };

    static getAllDraftProduct = async () => {
        const products = await Product.findAll({
            where: {
                isDraft: {
                    [Op.eq]: true,
                },
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return {
            products: JSON.parse(JSON.stringify(products, null, 2)),
        };
    };

    static createProduct = async (req) => {
        const product = await Product.create({
            id: uuidv4(),
            ...req.body,
        });
        return {
            product: product.dataValues,
        };
    };
}
module.exports = ProductService;
