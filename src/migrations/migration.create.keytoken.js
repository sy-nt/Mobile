'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("KeyTokens", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            refreshToken: {
                type: Sequelize.STRING,
            },
            refreshTokenUsed: {
                type: Sequelize.JSON,
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
        await queryInterface.dropTable('KeyTokens');
    }
};