"use strict";

const { OKResponse, CreatedResponse } = require("../core/success.respone");
const OrderService = require("../services/order.service");

class OrderController {
    placeOrder = async (req, res, next) => {
        return new OKResponse({
            message: "Update  cart success",
            metadata: await OrderService.placeOrder({
                cartId: req.user.id,
            }),
        }).send(res);
    };
}

module.exports = new OrderController();
