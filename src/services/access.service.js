"use strict";
const { User, KeyToken } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const UserService = require("./user.service");
const KeyTokenService = require("./keyToken.service");
const CartService = require("./cart.service");
const OTPService = require("./otp.service");
const { BadRequestError } = require("../core/error.respone");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils/index");
const { Op } = require("sequelize");

const ROLES = {
    admin: "0001",
    staff: "0010",
    user: "0100",
};

class AccessService {
    static signUp = async ({ email, password, phone, name }) => {
        const holderUser = await UserService.findUserByEmail(email);
        if (holderUser !== null)
            throw new BadRequestError("Error:: Email already registed");

        const newUser = await User.create({
            email,
            password,
            phone,
            name,
            roles: ROLES["user"],
        });
        if (!newUser) throw new BadRequestError("Something wrong");

        await CartService.createCart({ id: newUser.id });
        await OTPService.sendOTP({ email });

        return {
            user: getInfoData({
                fields: ["name", "email", "phone", "image"],
                object: newUser,
            }),
        };
    };

    static login = async ({ email, password }) => {
        const holderUser = await UserService.findUserByEmail(email);
        if (!holderUser)
            throw new BadRequestError("Error:: user is not registed");

        const isCorectPass = await bcrypt.compare(
            password,
            holderUser.password
        );
        if (!isCorectPass) throw new BadRequestError("Invalid request");

        if (!holderUser.verify)
            throw new BadRequestError("Error:: user is not verified");

        const tokens = await createTokenPair({
            id: holderUser.id,
            email,
        });

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            userId: holderUser.id,
            refreshTokenUsed: [],
        });

        return {
            user: getInfoData({
                fields: ["id", "name", "email", "phone", "image"],
                object: holderUser,
            }),
            tokens,
        };
    };

    static handleRefreshToken = async ({ refreshToken, user, keyToken }) => {
        const refreshTokenUsed = JSON.parse(keyToken.refreshTokenUsed);
        if (refreshTokenUsed.includes(refreshToken))
            throw new BadRequestError("pls relogin");

        const { id, email } = user;
        const tokens = await createTokenPair({ id, email });
        const newKeyToken = await KeyTokenService.addUsedRefreshToken({
            userId: user.id,
            refreshToken: refreshToken,
        });
        if (newKeyToken)
            return {
                tokens,
            };
        return null;
    };

    static logout = async ({ userId }) => {
        const delToken = await KeyTokenService.removeKeyTokenByUserId({
            userId,
        });
        if (delToken) return true;
        return null;
    };
}

module.exports = AccessService;
