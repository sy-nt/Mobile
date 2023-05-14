'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            cartId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM("pending", "paid"),
                defaultValue: "pending",
            },
            total_price: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
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
		await queryInterface.dropTable('Orders');
	}
};