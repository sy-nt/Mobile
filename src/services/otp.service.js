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
        if (!holderUser.dataValues)
            throw new BadRequestError("User is not registed");

        const codeString = Math.round(
            Math.random() * 100000 + 10000
        ).toString();
        console.log(`OTPcode:: `, codeString);
        const code = await bcrypt.hash(codeString, 10);
        const expiredTime = new Date().getTime() + EXPRIRE_TIME * 60 * 1000;

        console.log(`code:: ${code}`);
        console.log(`expiredTime:: ${expiredTime}`);

        const OTPobj = await OTP.create({
            userId: holderUser.id,
            code: code,
            expiredIn: expiredTime,
            id: uuidv4(),
        });

        return {
            OTP: OTPobj,
        };
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

        const OTPs = await OTP.findAll({
            where: {
                userId: {
                    [Op.eq]: holderUser.id,
                },
            },
        });

        const listOTP = JSON.parse(JSON.stringify(OTPs, null, 2));
        const hashedOtp = listOTP[listOTP.length - 1].code;

        const isMatch = await bcrypt.compare(code, hashedOtp);
        if (!isMatch) throw new BadRequestError("Invalid OTP");

        const deletedOTP = await OTP.destroy({
            where: {
                userId: {
                    [Op.eq]: holderUser.id,
                },
            },
        });

        return {
            user: holderUser,
            delete: deletedOTP,
        };
    };
}

module.exports = OTPService;
