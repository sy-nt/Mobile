"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface
            .bulkInsert("Users", [
                {
                    id: "7dfcd429-3d66-5d0a-914f-1a02158a4935",
                    name: "Admin",
                    email: "admin@gmail.com",
                    phone: "0909281588",
                    password: bcrypt.hashSync("password", 10),
                    image: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
                    verify: true,
                    roles: "0001",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ])
            .then(() =>
                queryInterface.bulkInsert(
                    "Carts",
                    [
                        {
                            id: "7dfcd429-3d66-5d0a-914f-1a02158a4935",
                            status: "active",
                            count_product: 0,
                            total: 0,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                    ],
                    {}
                )
            );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         *
         */
        await queryInterface.bulkDelete("Users", null, {});
    },
};
