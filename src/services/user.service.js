"use strict";

const { User, OTP, KeyToken, sequelize } = require("../models");
const { Op } = require("sequelize");
const { verifyOTP } = require("./otp.service");
const { activeCart } = require("./cart.service");

class UserService {
    static createUser = async ({ email, password }) => {
        const user = await User.create({
            email,
            password,
        });
        if (user) return user.dataValues;
        return null;
    };

    static findUserByEmail = async (email) => {
        const user = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });
        if (user) return user.dataValues;
        return null;
    };

    static activeUser = async ({ email, code }) => {
        const verify = await verifyOTP({ email, code });
        if (!verify) throw new Error("Something wrong happend");

        const activeUser = await User.update(
            {
                verify: true,
            },
            {
                where: {
                    email: {
                        [Op.eq]: email,
                    },
                },
            }
        );
        if (!activeUser) throw new Error("Something wrong happend");

        const active = await activeCart({ id: verify.id });
        if (active) return true;
        return null;
    };

    static updateUser = async (req) => {
        const updatedUser = await User.update(req.body, {
            where: {
                email: {
                    [Op.eq]: req.user.email,
                },
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return {
            updatedUser,
        };
    };
}

module.exports = UserService;
