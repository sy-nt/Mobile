"use strict";

const { OKResponse, CreatedResponse } = require("../core/success.respone");
const AccessService = require("../services/access.service");

class AccessController {
    signUp = async (req, res, next) => {
        return new CreatedResponse({
            message: "Sign up success",
            metadata: await AccessService.signUp(req.body),
        }).send(res);
    };

    login = async (req, res, next) => {
        return new OKResponse({
            message: "Login success",
            metadata: await AccessService.login(req.body),
        }).send(res);
    };

    logout = async (req, res, next) => {
        return new OKResponse({
            message: "Logout success",
            metadata: await AccessService.logout({ userId: req.user.id }),
        }).send(res);
    };

    handleRefreshToken = async (req, res, next) => {
        return new OKResponse({
            message: "Handle tokens success",
            metadata: await AccessService.handleRefreshToken({
                refreshToken: req.refreshToken,
                user: req.user,
                keyToken: req.keyToken,
            }),
        }).send(res);
    };
}

module.exports = new AccessController();
