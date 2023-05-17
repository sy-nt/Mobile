"use strict";

const { OTP, User, sequelize } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { BadRequestError } = require("../core/error.respone");
const nodeMailerSevice = require("./nodemailer.sevice");

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

        const otpCode = await this.createOTP({
            userId: holderUser.dataValues.id,
        });

        return await nodeMailerSevice.sendOTPEmail({
            OTP: otpCode,
            receiver: holderUser,
        });
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

        if (await this.deleteOTP({ userId: holderUser.dataValues.id }))
            return true;

        return null;
    };

    static createOTP = async ({ userId }) => {
        const otpCode = Math.round(Math.random() * 10000) + 100000;
        const otp = OTP.create({
            userId,
            code: bcrypt.hashSync(otpCode.toString(), 10),
        });

        if (otp) return otpCode;
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
