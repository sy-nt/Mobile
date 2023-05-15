"use strict";

const _ = require("lodash");
const crypto = require("crypto");
const url = require("node:url");

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
};

const fullUrl = (req) => {
    return url.format({
        protocol: req.protocol,
        host: req.get("host"),
        pathname: req.originalUrl,
    });
};

const getSelectData = (select = []) => {
    return Object.fromEntries(select.map((el) => [el, 1]));
};

const getUnSelectData = (select = []) => {
    return Object.fromEntries(select.map((el) => [el, 0]));
};

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
    getInfoData,
    fullUrl,
    getSelectData,
    getUnSelectData,
    createTokenPair,
};
