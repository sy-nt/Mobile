"use strict";

const { User } = require("../models");
const { Op } = require("sequelize");

class UserService {
    static findUserByEmail = async (email) => {
        const user = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });
        return user.dataValues;
    };
}

module.exports = UserService;
