"use strict";

const { asyncHandler } = require("../helpers/asyncHandler");
const {
    AuthFailureError,
    BadRequestError,
    UnauthorizedError,
} = require("../core/error.respone");
const jwt = require("jsonwebtoken");
const { findKeyTokenByUserId } = require("../services/keyToken.service");
const { findUserByEmail } = require("../services/user.service");

const HEADER = {
    CLIENT_ID: "x-client-id",
    AUTHORIZATION: "authorization",
    REFRESHTOKEN: "x-rtoken-id",
};

const authentication = asyncHandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new UnauthorizedError("authUtils 1");

    const keyToken = await findKeyTokenByUserId({ userId });
    if (!keyToken) throw new UnauthorizedError("authUtils 2");

    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new UnauthorizedError("authUtils 3");

    if (req.headers[HEADER.REFRESHTOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESHTOKEN];
            const decodedUser = jwt.verify(
                refreshToken,
                process.env.DEV_REFRESH_TOKEN_SECRET
            );
            if (userId != decodedUser.id)
                throw new UnauthorizedError("authUtils 4");

            req.user = decodedUser;
            req.refreshToken = refreshToken;
            req.keyToken = keyToken;
            return next();
        } catch (err) {
            console.log(err);
        }
    }

    if (req.headers[HEADER.AUTHORIZATION]) {
        try {
            const accessToken = req.headers[HEADER.AUTHORIZATION];
            const decodedUser = jwt.verify(
                accessToken,
                process.env.DEV_ACCESS_TOKEN_SECRET
            );
            if (userId != decodedUser.id)
                throw new UnauthorizedError("authUtils 5");

            req.user = decodedUser;
            req.keyToken = keyToken;
            return next();
        } catch (err) {
            throw new Error(err.message);
        }
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const user = await findUserByEmail(email);
    if (user?.roles === "0001") return next();
    throw new UnauthorizedError("Invalid");
});

const createTokenPair = async (payload) => {
    try {
        const accessToken = await jwt.sign(
            payload,
            process.env.DEV_ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1h",
            }
        );
        const refreshToken = await jwt.sign(
            payload,
            process.env.DEV_REFRESH_TOKEN_SECRET,
            {
                expiresIn: "7d",
            }
        );
        return {
            accessToken,
            refreshToken,
        };
    } catch (err) {
        console.log("Create Token Pair Error::", err.message);
    }
};

module.exports = {
    authentication,
    createTokenPair,
    isAdmin,
};
