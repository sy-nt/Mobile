"use strict";
const { ProductCart, Cart } = require("../models");
const ProductService = require("./product.service");
const { Op } = require("sequelize");
const { BadRequestError } = require("../core/error.respone");

class ProductCartService {
    static addProductCart = async ({ cartId, product }) => {
        const foundProduct = await ProductService.findProductById(product.id);
        if (foundProduct === null) throw new BadRequestError("Invalid product");

        const productCart = await this.findProductInCart({
            cartId,
            productId: product.id,
        });

        if (!productCart) {
            const { name, thumb, quantity, price } = product;
            console.log(product);
            return await this.createProductCart({
                name,
                thumb,
                quantity,
                price,
                productId: product.id,
                cartId,
            });
        }

        const newQuantity = productCart.quantity + product.quantity;
        if (newQuantity < 0)
            throw new BadRequestError("Invalid quantity product");
        if (newQuantity === 0)
            return await this.removeProductCart({
                cartId,
                productIds: product.id,
            });
        if (newQuantity > foundProduct.quantity)
            throw new BadRequestError("Stock is not enough");

        return await this.updateProductCart({
            cartId,
            productId: foundProduct.id,
            options: { quantity: newQuantity },
        });
    };

    static createProductCart = async ({
        name,
        thumb,
        quantity,
        price,
        cartId,
        productId,
    }) => {
        const productCart = await ProductCart.create({
            name,
            thumb,
            quantity,
            price,
            cartId,
            productId,
        });

        if (productCart) return productCart.dataValues;
        return null;
    };

    static removeProductCart = async ({ cartId, productIds }) => {
        const deleteProductCart = await ProductCart.destroy({
            where: {
                [Op.and]: [{ cartId }, { productId: productIds }],
            },
        });
        if (deleteProductCart) return true;
        return null;
    };

    static findAllProductCartByCartId = async (cartId) => {
        const productCarts = await ProductCart.findAll({
            where: {
                cartId: {
                    [Op.eq]: cartId,
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        if (productCarts)
            return JSON.parse(JSON.stringify(productCarts, null, 2));
        return null;
    };

    static findProductInCart = async ({ cartId, productId }) => {
        const productCart = await ProductCart.findOne({
            where: {
                [Op.and]: [{ cartId }, { productId: productId }],
            },
        });
        if (productCart) return productCart.dataValues;
        return null;
    };

    static updateProductCart = async ({ cartId, productId, options }) => {
        const updatedProduct = await ProductCart.update(options, {
            where: {
                [Op.and]: [{ cartId }, { productId }],
            },
        });
        if (!updatedProduct)
            throw new BadRequestError("Product cant be updated");
        return true;
    };
}

module.exports = ProductCartService;
