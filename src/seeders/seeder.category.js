"use strict";
const { v4: uuidv4 } = require("uuid");

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

        await queryInterface.bulkInsert(
            "Categories",
            [
                {
                    id: "7dfcd429-3d66-4d0a-914f-1a02158a4935",
                    name: "Rau xanh",
                    description:
                        "Rau là tên gọi chung cho những bộ phận của thực vật được con người hay động vật dùng làm thực phẩm",
                    thumb: "https://roots.vn/wp-content/uploads/2022/09/VEG00303-5.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "a1e004be-72cd-4d53-a3ec-76075a76e5b3",
                    name: "Củ quả",
                    description:
                        "Củ là các kiểu khác nhau của các cấu trúc thực vật bị biến đổi và phình to ra để lưu trữ các chất dinh dưỡng.",
                    thumb: "https://manafood.vn/wp-content/uploads/2020/07/cu-cai-trang-1000x1000-1.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "55737ef0-c483-45ba-ab2e-481883450f0d",
                    name: "Đậu hạt",
                    description:
                        "Đậu hay đỗ (theo phương ngữ miền Bắc) là hạt của một trong những chi thực vật có hoa thuộc họ Fabaceae. Chúng thường được dùng làm rau củ quả trong bữa ăn của con người hoặc động vật",
                    thumb: "https://wholefood.vn/wp-content/uploads/2021/08/an-dau-nanh-rang-lieu-co-tot-cho-suc-khoe-khong-201912081908160637.jpg",
                },
                {
                    id: "a3d190b1-040b-4891-b70b-66994366ddd4",
                    name: "Nấm",
                    description:
                        "Giới Nấm (tên khoa học: Fungi) bao gồm những sinh vật nhân chuẩn dị dưỡng có thành tế bào bằng kitin (chitin). Phần lớn nấm phát triển dưới dạng các sợi đa bào được gọi là sợi nấm (hyphae) tạo nên thể sợi (mycelium)",
                    thumb: "https://product.hstatic.net/1000301274/product/nam_dui_ga_56a385b12ba241bebf7c1b99f91e1570_1024x1024.png",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "ca9a153d-7b8e-4237-8117-90c0dbf08a71",
                    name: "Gạo",
                    description:
                        "Gạo là một sản phẩm lương thực thu từ cây lúa. Hạt gạo thường có màu trắng, nâu hoặc đỏ thẫm, chứa nhiều dinh dưỡng.",
                    thumb: "https://www.gaosach.vn/images/img/images/trang-chu/homgt.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: "c2d90347-b532-45a9-8a8b-15d330497b6c",
                    name: "Trái cây",
                    description:
                        "Trong thực vật học, quả hoặc trái là cấu trúc mang hạt trong những loại thực vật có hoa, được hình thành trong bầu nhụy sau khi nở hoa. ",
                    thumb: "https://media.vov.vn/sites/default/files/styles/large/public/2023-04/qua2.png.jpg",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         *
         */
        await queryInterface.bulkDelete("Categories", null, {});
    },
};
