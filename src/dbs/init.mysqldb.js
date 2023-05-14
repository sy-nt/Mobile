'use strict';
const { db: { host, name, username, password } } = require('../config/mysql.config')
const Sequelize = require('sequelize')

class Database {

    constructor() {
        this.connect()
    }

    async connect(type = 'mysql') {
        const sequelize = new Sequelize(name, username, password, {
            host: host,
            dialect: type
        })

        try {
            await sequelize.authenticate();
            console.log("Connected db successfuly")
        } catch (err) {
            console.log("Unable to connect db:: ", err.message)
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMySQL = Database.getInstance()
module.exports = instanceMySQL