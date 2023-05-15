"use strict";

const { OTP, User } = require("../models");
const { Op, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const UserService = require("./user.service");
const { BadRequestError } = require("../core/error.respone");

const EXPRIRE_TIME = 10;

class OTPService {
    static sendOTP = async ({ email }) => {
        const holderUser = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });
        if (!holderUser) throw new BadRequestError("User is not registed");

        return await this.createOTP({ userId: holderUser.dataValues.id });
    };

    static verifyOTP = async ({ email, code }) => {
        const holderUser = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });
        if (!holderUser) throw new BadRequestError("User is not registed");

        const OTPs = await this.findAllOtp({ userId: holderUser.id });
        if (!OTPs) throw new BadRequestError("Invalid OTP");

        const hashedOtp = OTPs[OTPs.length - 1].code;
        const isMatch = await bcrypt.compare(code, hashedOtp);
        if (!isMatch) throw new BadRequestError("Invalid OTP");

        if (await this.deleteOTP({ userID: holderUser.dataValues.id }))
            return holderUser.dataValues;
        return null;
    };

    static createOTP = async ({ userId }) => {
        const otp = OTP.create({
            userId,
        });

        if (otp) return otp.dataValues;
        return null;
    };

    static findAllOtp = async ({ userId }) => {
        const otps = await OTP.findAll({
            where: {
                userId: {
                    [Op.eq]: userId,
                },
            },
        });
        if (otps) return JSON.parse(JSON.stringify(otps, null, 2));
        return null;
    };

    static deleteOTP = async ({ userId }) => {
        const otps = await OTP.destroy({
            where: {
                userId: {
                    [Op.eq]: userId,
                },
            },
        });
        if (otps) return true;
        return null;
    };
}

module.exports = OTPService;
