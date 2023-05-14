const dev = {
    db: {
        name: process.env.DEV_DB_NAME,
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        host: process.env.DEV_DB_HOST
    },
    port: process.env.DEV_APP_PORT
}

const production = {
    db: {
        name: process.env.PRODUCTION_DB_NAME,
        username: process.env.PRODUCTION_DB_USERNAME,
        password: process.env.PRODUCTION_DB_PASSWORD,
        host: process.env.PRODUCTION_DB_HOST
    },
    port: process.env.PRODUCTION_APP_PORT
}

const configs = { dev, production }
const env = process.env.NODE_EV || 'dev'

module.exports = configs[env]