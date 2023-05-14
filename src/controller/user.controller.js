"use strict";

const { OKResponse, CreatedResponse } = require("../core/success.respone");
const UserService = require("../services/user.service");
const OTPService = require("../services/otp.service");

class UserController {
    activeUser = async (req, res, next) => {
        return new OKResponse({
            message: "Active user success",
            metadata: await UserService.activeUser(req.body),
        }).send(res);
    };

    updateUser = async (req, res, next) => {
        return new OKResponse({
            message: "Update user success",
            metadata: await UserService.updateUser(req),
        }).send(res);
    };

    sendOTP = async (req, res, next) => {
        return new OKResponse({
            message: "Send otp success",
            metadata: await OTPService.sendOTP(req.body),
        }).send(res);
    };
}

module.exports = new UserController();
