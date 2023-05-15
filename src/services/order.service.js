"use strict";
const { Order, Cart, ProductCart, ProductOrder } = require("../models");
const { v4: uuidv4 } = require("uuid");
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
            const {
                quantity,
                name,
                price,
                thumb,
                productId: orderId,
            } = element;
            return {
                quantity,
                name,
                price,
                thumb,
                orderId,
            };
        });
        const productCartIds = productCartList.map((e) => e.productId);

        const productOrders = ProductOrder.bulkCreate(productOrderList);
        if (!productOrders)
            throw new BadRequestError("Cant perfome bulkcreate");
        const productCarts = await ProductCartService.removeProductCart({
            cartId,
            productIds: productCartIds,
        });
        if (!productCarts)
            throw new BadRequestError("Cant perfome removeProductCart");
            
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
}

module.exports = OrderService;
