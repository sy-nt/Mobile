"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            email: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.TEXT,
            },
            verify: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            roles: {
                type: Sequelize.ENUM("0001", "0010", "0100"),
                defaultValue: "0100",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
