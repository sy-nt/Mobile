"use strict";

const { KeyToken } = require("../models");
const { Op } = require("sequelize");

class KeyTokenService {
    static createKeyToken = async ({
        refreshToken,
        userId,
        refreshTokenUsed,
    }) => {
        const keyToken = await KeyToken.create({
            refreshToken,
            userId,
            refreshTokenUsed,
        });
        if (keyToken) return keyToken.dataValues;
        return null;
    };

    static findKeyTokenByUserId = async ({ userId }) => {
        const keyToken = await KeyToken.findOne({
            where: {
                userId: {
                    [Op.eq]: userId,
                },
            },
        });
        if (keyToken) return keyToken.dataValues;
        return null;
    };

    static removeKeyTokenByUserId = async ({ userId }) => {
        const keyToken = await KeyToken.destroy({
            where: {
                userId: {
                    [Op.eq]: userId,
                },
            },
        });
        if (keyToken) return true;
        return null;
    };

    static addUsedRefreshToken = async ({ userId, refreshToken }) => {
        const keyTokenHolder = await this.findKeyTokenByUserId({ userId });
        const refreshTokenUsed = JSON.parse(keyTokenHolder.refreshTokenUsed);
        refreshTokenUsed.push(refreshToken);

        const keyToken = await KeyToken.update(
            {
                refreshToken: refreshToken,
                refreshTokenUsed: refreshTokenUsed,
            },
            {
                where: {
                    userId: {
                        [Op.eq]: userId,
                    },
                },
            }
        );
        console.log(keyToken);
        if (keyToken) return true;
        return null;
    };
}

module.exports = KeyTokenService;
