"use strict";
const { Order, ProductOrder } = require("../models");
const { Op } = require("sequelize");
const ProductCartService = require("./productCart.service");
const CartService = require("./cart.service");
const { BadRequestError } = require("../core/error.respone");

class OrderService {
    static placeOrder = async ({ cartId }) => {
        const cartHolder = await CartService.findCartById(cartId);
        if (!cartHolder) throw new BadRequestError("invalid cart");

        const order = await this.createOrder({
            cartId,
            total: cartHolder.total,
        });

        const productCartList =
            await ProductCartService.findAllProductCartByCartId(cartId);
        const productOrderList = productCartList.map((element) => {
            const { quantity, name, price, thumb, productId } = element;
            return {
                quantity,
                name,
                price,
                thumb,
                productId,
                userId: cartId,
                orderId: order.id,
            };
        });
        const productCartIds = productCartList.map((e) => e.productId);

        const productOrders = await ProductOrder.bulkCreate(productOrderList);
        if (!productOrders)
            throw new BadRequestError("Cant perfome bulkcreate");
        const productCarts = await ProductCartService.removeProductCart({
            cartId,
            productIds: productCartIds,
        });
        if (!productCarts)
            throw new BadRequestError("Cant perfome removeProductCart");

        await CartService.updateCart({
            id: cartId,
            options: {
                count_product: 0,
                total: 0,
            },
        });

        return {
            id: order.id,
            cartId,
            status: order.status,
            total: order.total,
            productOrders: productOrderList,
        };
    };

    static getOrderByOrderId = async (orderId) => {
        const order = await Order.findOne({
            where: {
                id: {
                    [Op.eq]: orderId,
                },
            },
        });

        if (order) return order.dataValues;
        return null;
    };

    static createOrder = async ({ cartId, total }) => {
        const order = await Order.create({ cartId, total });
        if (order) return order.dataValues;
        return null;
    };

    static updateStatusOrder = async ({ orderId }) => {
        const updatedOrder = await Order.update(
            { status: "paid" },
            {
                where: {
                    id: {
                        [Op.eq]: orderId,
                    },
                },
            }
        );
        if (!updatedOrder) throw new BadRequestError("Invalid order");

        const productOrderList = await ProductOrder.update(
            { status: "sold" },
            {
                where: {
                    orderId: {
                        [Op.eq]: orderId,
                    },
                },
            }
        );
        if (!productOrderList) throw new BadRequestError("Invalid order");

        return true;
    };
}

module.exports = OrderService;
