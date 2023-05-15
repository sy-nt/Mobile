"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface
            .createTable("Products", {
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
                price: {
                    type: Sequelize.INTEGER,
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
                    allowNull: false,
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
            })
            .then(() =>
                queryInterface.addIndex("Products", ["name", "description"], {
                    type: "FULLTEXT",
                })
            );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Products");
    },
};
