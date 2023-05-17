const dev = {
    service: "gmail",
    auth: {
        user: process.env.DEV_NODEMAILER_USER,
        pass: process.env.DEV_NODEMAILER_PASS
    }
};

const production = {
    host: process.env.PRODUCTION_NODEMAILER_HOST,
    port: process.env.PRODUCTION_NODEMAILER_PORT,
    secure: process.env.DEV_NODEMAILER_PORT === 465 ? true : false,
    auth: {
        user: process.env.PRODUCTION_NODEMAILER_USER,
        pass: process.env.PRODUCTION_NODEMAILER_PASS,
    },
};

const configs = { dev, production };
const env = process.env.NODE_EV || "dev";

module.exports = configs[env];
