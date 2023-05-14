"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Products", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            thumb: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            slug: {
                type: Sequelize.STRING,
            },
            unit: {
                type: Sequelize.STRING,
            },
            isDraft: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            isPublished: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            quantity: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("Products");
    },
};
