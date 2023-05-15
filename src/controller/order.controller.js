"use strict";

const { OKResponse, CreatedResponse } = require("../core/success.respone");
const OrderService = require("../services/order.service");

class OrderController {
    placeOrder = async (req, res, next) => {
        return new OKResponse({
            message: "Place order success",
            metadata: await OrderService.placeOrder({
                cartId: req.user.id,
            }),
        }).send(res);
    };
    updateStatusOrder = async (req, res, next) => {
        return new OKResponse({
            message: "Update  order success",
            metadata: await OrderService.updateStatusOrder({
                orderId: req.params.orderId,
            }),
        }).send(res);
    };
}

module.exports = new OrderController();
