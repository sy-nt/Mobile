"use strict";

const { User, OTP, KeyToken } = require("../models");
const { Op } = require("sequelize");
const { verifyOTP } = require("./otp.service");
const { activeCart } = require("./cart.service");

class UserService {
    static findUserByEmail = async (email) => {
        const user = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });
        return user;
    };

    static activeUser = async ({ email, code }) => {
        const verify = await verifyOTP({ email, code });
        if (!verify.delete) throw new Error("Something wrong happend");

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

        await activeCart({ id: verify.user.id });

        return {
            user: activeUser,
        };
    };

    static updateUser = async (req) => {
        console.log(req.body);
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
