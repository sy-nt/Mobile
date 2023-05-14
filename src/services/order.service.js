"use strict";
const { Order, Cart, ProductCart, ProductOrder } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const ProductCartService = require("./productCart.service");
const CartService = require("./cart.service");
const { BadRequestError } = require("../core/error.respone");

class OrderService {
    static createOrder = async ({ cartId }) => {
        const cartHolder = await CartService.findCartById(cartId);
        if (!cartHolder) throw new BadRequestError("invalid cart");

        const productCartListObj =
            await ProductCartService.findProductCartByCartId(cartId);
        const productCartList = productCartListObj.products;

        const order = await Order.create({
            cartId,
            total_price: cartHolder.total,
        });
        if (!order) throw new BadRequestError("Something wrong:: order");

        const productOrderList = productCartList.map((element) => {
            const { quantity, name, price, thumb, productId } = element;

            return {
                quantity,
                name,
                price,
                thumb,
                productId,
                orderId: order.dataValues.id,
            };
        });

        const productOrders = ProductOrder.bulkCreate(productOrderList);

        const productCartIds = productCartList.map((e) => e.productId);
        await ProductCartService.removeProductCart({
            cartId,
            productIds: productCartIds,
        });

        if (!productOrders)
            throw new BadRequestError("Something wrong:: orderproduct");

        return {
            id: order.id,
            cartId,
            status: order.status,
            total: order.total,
            productOrders: productOrderList,
        };
    };
}

module.exports = OrderService;
