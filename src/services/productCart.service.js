"use strict";
const { ProductCart, Cart } = require("../models");
const ProductService = require("./product.service");
const { Op } = require("sequelize");
const { BadRequestError } = require("../core/error.respone");

class ProductCartService {
    static addProductCart = async ({ cartId, product }) => {
        const foundProduct = await ProductService.findProductById(product.id);
        if (!foundProduct || foundProduct.isDraft)
            throw new BadRequestError("Invalid product");

        const productCart = await ProductCart.findOne({
            where: {
                [Op.and]: [{ cartId }, { productId: product.id }],
            },
        });
        if (!productCart) {
            const { price, name, thumb, quantity, id } = product;
            const newProductCart = await ProductCart.create({
                cartId,
                price,
                name,
                thumb,
                quantity,
                productId: id,
            });

            return {
                newProductCart,
            };
        }
        const newQuantity = productCart.dataValues.quantity + product.quantity;

        if (newQuantity < 0)
            throw new BadRequestError("Invalid quantity product");

        if (newQuantity === 0)
            return await this.removeProductCart({
                cartId,
                productId: product.id,
            });

        if (newQuantity > foundProduct.quantity)
            throw new BadRequestError("Stock is not enough");

        const newProductCart = await ProductCart.increment(
            {
                quantity: product.quantity,
            },
            {
                where: {
                    [Op.and]: [{ cartId }, { productId: product.id }],
                },
            }
        );
        return newProductCart;
    };

    // static removeProductCart = async ({ cartId, productId }) => {
    //     const foundProduct = await ProductService.findProductById(productId);

    //     if (!foundProduct || foundProduct.isDraft)
    //         throw new BadRequestError("Invalid product");

    //     const productCart = await ProductCart.findOne({
    //         where: {
    //             [Op.and]: [{ cartId }, { productId }],
    //         },
    //     });

    //     if (!productCart) throw new BadRequestError("Invalid product");
    //     const deleteProductCart = await ProductCart.destroy({
    //         where: {
    //             [Op.and]: [{ cartId }, { productId }],
    //         },
    //     });

    //     return deleteProductCart;
    // };

    static removeProductCart = async ({ cartId, productIds }) => {
        const deleteProductCart = await ProductCart.destroy({
            where: {
                [Op.and]: [{ cartId }, { productId: productIds }],
            },
        });

        return deleteProductCart;
    };

    static findProductCartByCartId = async (cartId) => {
        const productCarts = await ProductCart.findAll({
            where: {
                cartId: {
                    [Op.eq]: cartId,
                },
            },
        });

        if (!productCarts) throw new BadRequestError("Invalid cartId");

        return {
            products: JSON.parse(JSON.stringify(productCarts, null, 2)),
        };
    };
}

module.exports = ProductCartService;
