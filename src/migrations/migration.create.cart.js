"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Carts", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			state: Sequelize.ENUM("active", "completed", "failed"),
			count_product: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			userId: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			expireTime: Sequelize.DATE,
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
		await queryInterface.dropTable("Carts");
	},
};
