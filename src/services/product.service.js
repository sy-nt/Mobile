"use strict";

const { Product, Sequelize, ProductOrder, User } = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { BadRequestError, ForbiddenError } = require("../core/error.respone");
const UserService = require("./user.service");
const slugify = require("slugify");

class ProductService {
    static defaultOrder = [
        ["star", "DESC"],
        ["soldCount", "DESC"],
    ];
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

    static getAllPublishedProduct = async ({
        order = this.defaultOrder,
        offset = 0,
        limit = 20,
    }) => {
        const products = await Product.findAll({
            where: {
                isPublished: {
                    [Op.eq]: true,
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "isDraft", "isPublished"],
            },
            order,
            offset,
            limit,
        });
        if (products) return JSON.parse(JSON.stringify(products, null, 2));
        return null;
    };

    static getAllDraftProduct = async ({
        order = this.defaultOrder,
        offset = 0,
        limit = 20,
    }) => {
        const products = await Product.findAll({
            where: {
                isDraft: {
                    [Op.eq]: true,
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "isDraft", "isPublished"],
            },
            order,
            offset,
            limit,
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

    static searchProductWithFilter = async ({
        search,
        filter,
        order = this.defaultOrder,
        offset = 0,
        limit = 20,
    }) => {
        const listProducts = await Product.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "isDraft", "isPublished"],
            },
            where: [
                { isPublished: true, ...filter },
                Sequelize.literal("MATCH (name, description) AGAINST (:name)"),
            ],
            replacements: {
                name: search,
            },
            order,
            offset,
            limit,
        });

        return JSON.parse(JSON.stringify(listProducts, null, 2));
    };

    static reviewProduct = async ({ review, productId, email }) => {
        const holderUser = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });

        const productHolder = await ProductService.findProductById(productId);
        if (!productHolder) throw new BadRequestError("Invalid Product");

        if (!holderUser) throw new BadRequestError("Invalid user");
        const boughtProductPromise = await ProductOrder.findOne({
            where: {
                userId: holderUser.dataValues.id,
                productId,
                status: "sold",
            },
        });

        const boughtProduct = boughtProductPromise.dataValues;
        if (!boughtProduct) throw new ForbiddenError("forbidden");

        const reviewHolder = JSON.parse(productHolder.review);

        const totalStar =
            reviewHolder.length * productHolder.star + review.star;
        const star =
            Math.round((totalStar / (reviewHolder.length + 1)) * 2) / 2;
        const newReview = {
            star: review.star,
            text: review.text,
            name: holderUser.dataValues.name,
            createdAt: new Date(),
        };
        reviewHolder.push(newReview);

        const reviewProduct = Product.update(
            {
                soldCount: productHolder.soldCount + boughtProduct.quantity,
                star: star,
                review: reviewHolder,
            },
            {
                where: {
                    id: {
                        [Op.eq]: productId,
                    },
                },
            }
        );
        if (!reviewProduct) throw new BadRequestError("Invalid review");
        return {
            star: review.star,
            text: review.text,
            name: holderUser.name,
            createdAt: new Date(),
        };
    };
}
module.exports = ProductService;
