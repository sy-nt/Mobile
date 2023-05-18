"use strict";
const { Cart } = require("../models");
const { Op } = require("sequelize");
const ProductCartService = require("./productCart.service");
const { BadRequestError } = require("../core/error.respone");

class CartService {
    static createCart = async ({ id }) => {
        const cart = await Cart.create({
            id,
            status: "inactive",
        });
        if (cart) return cart.dataValues;
        return null;
    };

    static activeCart = async ({ id }) => {
        const cart = await Cart.update(
            {
                status: "active",
            },
            {
                where: {
                    id: {
                        [Op.eq]: id,
                    },
                },
            }
        );
        if (cart) return cart.dataValues;
        return null;
    };

    static updateCart = async ({ id, options }) => {
        const updatedCart = await Cart.update(options, {
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });
        if (updatedCart) return true;
        return null;
    };

    static findCartById = async (id) => {
        const cart = await Cart.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });
        if (cart) return cart.dataValues;
        return null;
    };

    static addProductToCart = async ({ id, product }) => {
        const productCart = await ProductCartService.addProductCart({
            cartId: id,
            product,
        });

        if (!productCart) throw new BadRequestError("Something wrong happend");

        const productCarts =
            await ProductCartService.findAllProductCartByCartId(id);

        let totalPrice = 0;
        let totalProduct = 0;

        if (productCarts.length !== 0) {
            totalPrice = productCarts.reduce(
                (acc, e) => (acc += e.quantity * e.price),
                0
            );

            totalProduct = productCarts.reduce((acc, e) => acc + e.quantity, 0);
        }

        const updatedCart = await this.updateCart({
            id,
            options: {
                total: totalPrice,
                count_product: totalProduct,
            },
        });
        if (!updatedCart) throw new BadRequestError("Updated cart failed");
        return productCarts;
    };

    static removeProductCart = async ({ id, productIds }) => {
        const productCart = await ProductCartService.removeProductCart({
            cartId: id,
            productIds,
        });
        if (!productCart) throw new BadRequestError("Something wrong happend");

        const productCarts =
            await ProductCartService.findAllProductCartByCartId(id);

        let totalPrice = 0;
        let totalProduct = 0;

        if (productCarts.length !== 0) {
            totalPrice = productCarts.reduce(
                (acc, e) => (acc += e.quantity * e.price),
                0
            );

            totalProduct = productCarts.reduce((acc, e) => acc + e.quantity, 0);
        }

        const updatedCart = await this.updateCart({
            id,
            options: {
                total: totalPrice,
                count_product: totalProduct,
            },
        });

        if (!updatedCart) throw new BadRequestError("Updated cart failed");
        return {
            ...updatedCart,
            productCarts,
        };
    };
}

module.exports = CartService;
