"use strict";
const nodemailer = require("nodemailer");
const mailGen = require("mailgen");

const config = require("../config/nodemailer/nodemailer.config");

class nodeMailerSevice {
    static sendOTPEmail = async ({ OTP, receiver }) => {
        let transporter = nodemailer.createTransport(config);

        const mailGenerator = new mailGen({
            theme: "default",
            product: {
                name: "Shop bán nông sản",
                link: "http://localhost:4040",
                logo: "https://play-lh.googleusercontent.com/bJzyZoIRTqw-oFBOVuLmiyqDMOh6z0owzw5fpnYe_4b_vu6s5-MR0CzpLiQPmCN3ipo",
                logoHeight: "50px",
            },
        });

        const response = {
            body: {
                name: receiver.name ? receiver.name : receiver.email,
                intro: `Thank you for register. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes. OTP: ${OTP}`,
                outro: "Looking forward to do more bussiness",
            },
        };

        const mail = mailGenerator.generate(response);

        const mailConfig = {
            from: config.auth.user, // sender address
            to: receiver.email,
            subject: "Verify OTP for register Shop nông sản", // Subject line
            html: mail, // html body
        };

        transporter
            .sendMail(mailConfig)
            .then(() => {
                console.log(`sendMail successfully to ${receiver}`);
                return "success";
            })
            .catch((err) => {
                throw new Error(err);
            });
    };
}

module.exports = nodeMailerSevice;
