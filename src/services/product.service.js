"use strict";

const { Product, Sequelize } = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { BadRequestError } = require("../core/error.respone");
const slugify = require("slugify");

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
        if (!updatedProduct)
            throw new BadRequestError("Product cant be updated");
        return true;
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
        if (!updatedProduct)
            throw new BadRequestError("Product cant be updated");
        return true;
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
        if (products) return JSON.parse(JSON.stringify(products, null, 2));
        return null;
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
        if (products) return JSON.parse(JSON.stringify(products, null, 2));
        return null;
    };

    static createProduct = async (req) => {
        const product = await Product.create({
            id: uuidv4(),
            ...req.body,
        });

        if (product) return product.dataValues;
        return null;
    };

    static findProductById = async (id) => {
        const product = await Product.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });

        if (product && product.dataValues.isPublished)
            return product.dataValues;
        return null;
    };

    static updateProduct = async ({ productId, product }) => {
        const updatedProduct = await Product.update(
            {
                ...product,
            },
            {
                where: {
                    id: {
                        [Op.eq]: productId,
                    },
                },
            }
        );
        if (!updatedProduct)
            throw new BadRequestError("Product cant be updated");

        return true;
    };

    static searchProduct = async ({ search }) => {
        const listProducts = await Product.findAll({
            where: [
                { isPublished: true },
                Sequelize.literal("MATCH (name) AGAINST (:name)"),
            ],
            replacements: {
                name: search,
            },
        });

        return JSON.parse(JSON.stringify(listProducts, null, 2));
    };
}
module.exports = ProductService;
