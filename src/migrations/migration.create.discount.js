"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Discounts", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            name: Sequelize.STRING,
            description: Sequelize.TEXT,
            type: Sequelize.ENUM("fixed_amount", "percentage"),
            value: Sequelize.INTEGER,
            code: Sequelize.STRING,
            start_date: Sequelize.DATE,
            end_date: Sequelize.DATE,
            max_uses: Sequelize.INTEGER,
            uses_count: Sequelize.INTEGER,
            max_uses_per_user: Sequelize.INTEGER,
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            applies_to: Sequelize.ENUM("all", "specific"),
            product_ids: Sequelize.JSON,
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
        await queryInterface.dropTable("Discounts");
    },
};
