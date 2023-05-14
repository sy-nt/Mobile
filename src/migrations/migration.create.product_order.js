"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("ProductOrders", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            orderId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: Sequelize.INTEGER,
            name: Sequelize.STRING,
            quantity: Sequelize.INTEGER,
            discount: Sequelize.STRING,
            thumb: Sequelize.STRING,
            productId: Sequelize.STRING,
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
        await queryInterface.dropTable("ProductOrders");
    },
};
