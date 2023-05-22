"use strict";

const { OKResponse, CreatedResponse } = require("../core/success.respone");
const CartService = require("../services/cart.service");

class CartController {
    addProductToCart = async (req, res, next) => {
        return new OKResponse({
            message: "Update  cart success",
            metadata: await CartService.addProductToCart({
                id: req.user.id,
                product: req.body,
            }),
        }).send(res);
    };

    removeProductCart = async (req, res, next) => {
        return new OKResponse({
            message: "Update  cart success",
            metadata: await CartService.removeProductCart({
                id: req.user.id,
                productIds: req.body.id,
            }),
        }).send(res);
    };

    getCart = async (req, res, next) => {
        return new OKResponse({
            message: "Get  cart success",
            metadata: await CartService.getCart({
                id: req.user.id,
            }),
        }).send(res);
    };
}

module.exports = new CartController();
