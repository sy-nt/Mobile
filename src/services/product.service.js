"use strict";

const { Product } = require("../models");
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
            slug: slugify(req.body.name),
        });
        return {
            product: product.dataValues,
        };
    };

    static findProductById = async (id) => {
        const product = await Product.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });

        return {
            product: product.dataValues,
        };
    };

    static updateProduct = async ({ productId, product }) => {
        const productHolder = await this.findProductById(productId);
        if (!productHolder) throw new BadRequestError("Invalid product id");

        const updateProduct = await Product.update(
            {
                ...product,
                slug: product.name
                    ? slugify(product.name)
                    : slugify(productHolder),
            },
            {
                where: {
                    id: {
                        [Op.eq]: productId,
                    },
                },
            }
        );
        if (!updateProduct)
            throw new BadRequestError("Product cant be updated");

        console.log(updateProduct);
        return { updateProduct };
    };
}
module.exports = ProductService;
