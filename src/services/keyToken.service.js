"use strict";

const { KeyToken } = require("../models");
const { Op } = require("sequelize");

class KeyTokenService {
    static createKeyToken = async ({
        refreshToken,
        userId,
        refreshTokenUsed,
    }) => {
        return await KeyToken.create({
            refreshToken,
            userId,
            refreshTokenUsed,
        });
    };

    static findKeyTokenByUserId = async ({ userId }) => {
        const keyToken = await KeyToken.findOne({
            where: {
                userId: {
                    [Op.eq]: userId,
                },
            },
        });
        return keyToken.dataValues;
    };

    static removeKeyTokenByUserId = async ({ userId }) => {
        const keyToken = await KeyToken.destroy({
            where: {
                userId: {
                    [Op.eq]: userId,
                },
            },
        });
        return keyToken;
    };
}

module.exports = KeyTokenService;
