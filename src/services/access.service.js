"use strict";
const { User, KeyToken } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const UserService = require("./user.service");
const KeyTokenService = require("./keyToken.service");
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
    static signUp = async ({ name, email, password }) => {
        const holderUser = await UserService.findUserByEmail(email);

        if (holderUser)
            throw new BadRequestError("Error:: Email already registed");

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            id: uuidv4(),
            email: email,
            password: passwordHash.toString(),
            name: name,
            roles: ROLES["user"],
        });

        if (newUser) {
            const tokens = await createTokenPair({
                email,
                id: newUser.id,
            });
            return {
                shop: getInfoData({
                    fields: ["name", "email", "phone", "image"],
                    object: newUser,
                }),
                tokens,
            };
        }
        return {
            user: getInfoData({
                fields: ["name", "email", "phone", "image"],
                object: newUser,
            }),
            tokens,
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
            throw new BadRequestError("Something wrong pls relogin");

        const { id, email } = user;
        const tokens = await createTokenPair({ id, email });
        await KeyToken.update(
            {
                refreshToken: tokens.refreshToken,
                refreshTokenUsed: [...refreshTokenUsed, refreshToken],
            },
            {
                where: {
                    refreshToken: {
                        [Op.eq]: refreshToken,
                    },
                },
            }
        );
        return {
            tokens,
        };
    };
}

module.exports = AccessService;
