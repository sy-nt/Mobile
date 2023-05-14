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

        return {
            cart,
        };
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

        return {
            cartUpdated: cart,
        };
    };

    static findCartById = async (id) => {
        const cart = await Cart.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });

        return cart;
    };

    static addProductToCart = async ({ id, product }) => {
        const productCart = await ProductCartService.addProductCart({
            cartId: id,
            product,
        });

        if (!productCart) throw new BadRequestError("Something wrong happend");

        const productCartsObj =
            await ProductCartService.findProductCartByCartId(id);
        const productCarts = productCartsObj.products;

        let totalPrice = 0;
        let totalProduct = 0;

        if (productCarts.length !== 0) {
            totalPrice = productCarts.reduce(
                (acc, e) => (acc += e.quantity * e.price),
                0
            );

            totalProduct = productCarts.reduce((acc, e) => acc + e.quantity, 0);
        }

        const updatedCart = await Cart.update(
            {
                total: totalPrice,
                count_product: totalProduct,
            },
            {
                where: {
                    id: {
                        [Op.eq]: id,
                    },
                },
            }
        );

        if (!updatedCart) throw new BadRequestError("Updated cart failed");
        return {
            count_product: totalProduct,
            total: totalPrice,
            productCarts,
        };
    };

    static removeProductCart = async ({ id, productIds }) => {
        const productCart = await ProductCartService.removeProductCart({
            cartId: id,
            productIds,
        });

        if (!productCart) throw new BadRequestError("Something wrong happend");

        const productCartsObj =
            await ProductCartService.findProductCartByCartId(id);
        const productCarts = productCartsObj.products;

        let totalPrice = 0;
        let totalProduct = 0;

        if (productCarts.length !== 0) {
            totalPrice = productCarts.reduce(
                (acc, e) => (acc += e.quantity * e.price),
                0
            );

            totalProduct = productCarts.reduce((acc, e) => acc + e.quantity, 0);
        }

        const updatedCart = await Cart.update(
            {
                total: totalPrice,
                count_product: totalProduct,
            },
            {
                where: {
                    id: {
                        [Op.eq]: id,
                    },
                },
            }
        );

        if (!updatedCart) throw new BadRequestError("Updated cart failed");
        return {
            count_product: totalProduct,
            total: totalPrice,
            productCarts,
        };
    };
}

module.exports = CartService;
