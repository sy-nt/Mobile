"use strict";
const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");
const { Product } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * aw
         * id: uuidv4(),ait queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         * slug: slugify('John Doe'),
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "Products",
            [
                {
                    id: uuidv4(),
                    name: "Nấm hương",
                    slug: slugify("Nấm hương"),
                    thumb: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Lentinula_edodes_20101113_a.jpg/1200px-Lentinula_edodes_20101113_a.jpg`,
                    description:
                        "Nấm hương (còn gọi là nấm đông cô) là một loại nấm ăn có nguồn gốc bản địa ở Đông Á. Ngoài ra, chúng còn mọc hoang nhiều ở Việt Nam có hương vị đặc trưng, được sử dụng trong nhiều món ăn.",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    category: "a3d190b1-040b-4891-b70b-66994366ddd4",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Nấm rơm",
                    slug: slugify("Nấm rơm"),
                    thumb: `https://namxanh.vn/wp-content/uploads/2020/04/nam-rom-tuoi.jpg`,
                    description:
                        "Nấm rơm hay nấm mũ rơm là một loài nấm trong họ nấm lớn sinh trưởng và phát triển từ các loại rơm rạ. Nấm gồm nhiều loài khác nhau, có đặc điểm hình dạng khác nhau như có loại màu xám trắng, xám, xám đen… kích thước đường kính 'cây nấm' lớn, nhỏ tùy thuộc từng loại. Là loại nấm giàu dinh dưỡng.",
                    category: "a3d190b1-040b-4891-b70b-66994366ddd4",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Nấm mèo",
                    slug: slugify("Nấm mèo"),
                    thumb: `https://nutriworld.net/wp-content/uploads/2017/07/3-1.jpg`,
                    description:
                        "Nấm mèo hay mộc nhĩ đen được biết đến do hình dạng tựa tai người, có màu nâu sẫm đến đen, mọc trên các thân cây mục. Nó có kết cấu tựa cao su, tương đối cứng và giòn.",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    category: "a3d190b1-040b-4891-b70b-66994366ddd4",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Nấm đùi gà",
                    slug: slugify("Nấm đùi gà"),
                    thumb: `https://agriculturevn.com/wp-content/uploads/2020/03/22.jpeg`,
                    description:
                        "Nấm bào ngư Nhật hay Nấm bào ngư chân dày, Nấm đùi gà (danh pháp hai phần: Pleurotus eryngii) là một loài nấm ăn được, có mùi thơm của quả hạnh, vị ngọt và giòn của bào ngư. Loài nấm này là loài bản địa khu vực Địa Trung Hải của châu Âu, Trung Đông, Bắc Phi",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    category: "a3d190b1-040b-4891-b70b-66994366ddd4",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Nấm mối",
                    slug: slugify("Nấm mối"),
                    thumb: `https://namxanh.vn/wp-content/uploads/2020/02/nam-moi-den-1.jpg`,
                    description:
                        "Nấm mối là loại nấm chỉ mọc trong tự nhiên, có tên tiếng anh là collybia albuminosa thuộc họ lyophyllaceae. Nấm mối được hình thành và sinh trưởng nhờ nước bọt của mối thợ tiết ra và vương vãi trong đất. Có khi nấm mối mọc đến vài mét vì mối thợ đi đến đâu đều để lại nước bọt đến đó.",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    category: "a3d190b1-040b-4891-b70b-66994366ddd4",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Nấm mỡ",
                    slug: slugify("Nấm mỡ"),
                    thumb: `https://vinmec-prod.s3.amazonaws.com/images/20210602_142946_222362_nam-mo-nau-gi.max-1800x1800.jpg`,
                    description:
                        "Nấm mỡ hay còn được biết đến với tên gọi nấm trắng hay nấm ma cô. Ngoài ra còn có tên gọi khác độc đáo hơn là nấm Paris Agaricus bisporus. Nấm mỡ bắt nguồn từ những nước có khí hậu ôn đới.",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    category: "a3d190b1-040b-4891-b70b-66994366ddd4",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Nấm kim châm",
                    slug: slugify("Nấm kim châm"),
                    thumb: `https://product.hstatic.net/200000423303/product/nam-kim-cham-han-quoc_05050b0f8abf415cbb679c2d62cf05f4.jpg`,
                    description:
                        "Nấm kim châm là một loài nấm màu trắng được sử dụng trong ẩm thực các nước châu Á như Nhật Bản, Trung Hoa, bán đảo Triều Tiên. Đây là giống trồng của Flammulina velutipes. Dạng cây mọc hoang có màu khác.",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    category: "a3d190b1-040b-4891-b70b-66994366ddd4",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Rau cải xoong",
                    slug: slugify("Rau cải xoong"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Rau cải xoong là loại rau xanh có lá màu xanh đậm, được sử dụng trong nhiều món ăn.",
                    category: "7dfcd429-3d66-4d0a-914f-1a02158a4935",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Rau muống",
                    slug: slugify("Rau muống"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Rau muống là loại rau xanh có lá dài và mảnh, thường được sử dụng trong các món xào hoặc nấu canh.",
                    category: "7dfcd429-3d66-4d0a-914f-1a02158a4935",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Cải thìa",
                    slug: slugify("Cải thìa"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Cải thìa là loại rau xanh có lá màu xanh nhạt, thường được sử dụng trong các món ăn chay.",
                    category: "7dfcd429-3d66-4d0a-914f-1a02158a4935",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Rau đay",
                    slug: slugify("Rau đay"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Rau đay là loại rau xanh có lá nhỏ và mảnh, thường được sử dụng trong các món salad.",
                    category: "7dfcd429-3d66-4d0a-914f-1a02158a4935",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Rau cải thìa",
                    slug: slugify("Rau cải thìa"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Rau cải thìa là loại rau xanh có lá màu xanh nhạt và thường được sử dụng trong các món ăn chay.",
                    category: "7dfcd429-3d66-4d0a-914f-1a02158a4935",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Rau ngót",
                    slug: slugify("Rau ngót"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Rau ngót là loại rau xanh có lá mảnh và có hương vị đắng nhẹ, thường được sử dụng trong các món nước chấm.",
                    category: "7dfcd429-3d66-4d0a-914f-1a02158a4935",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Rau cải bó xôi",
                    slug: slugify("Rau cải bó xôi"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Rau cải bó xôi là loại rau xanh có lá màu xanh đậm và thường được sử dụng trong các món xào hoặc nấu canh.",
                    category: "7dfcd429-3d66-4d0a-914f-1a02158a4935",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Khoai tây",
                    slug: slugify("Khoai tây"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Khoai tây là loại củ được sử dụng phổ biến trong nhiều món ăn, chủ yếu là nấu, nướng hoặc chiên.",
                    category: "a1e004be-72cd-4d53-a3ec-76075a76e5b3",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Cà rốt",
                    slug: slugify("Cà rốt"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Cà rốt là loại củ có màu cam, được sử dụng trong nhiều món ăn, chủ yếu là rau sống hoặc nấu.",
                    category: "a1e004be-72cd-4d53-a3ec-76075a76e5b3",

                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Củ cải trắng",
                    slug: slugify("Củ cải trắng"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Củ cải trắng là loại củ có màu trắng, được sử dụng trong nhiều món ăn, chủ yếu là nấu hoặc xào.",
                    category: "a1e004be-72cd-4d53-a3ec-76075a76e5b3",

                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Củ đậu tương",
                    slug: slugify("Củ đậu tương"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Củ đậu tương là loại củ được sử dụng để làm nước tương, chủ yếu là trong các món ăn Á Đông.",
                    category: "a1e004be-72cd-4d53-a3ec-76075a76e5b3",

                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Củ hành tây",
                    slug: slugify("Củ hành tây"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Củ hành tây là loại củ có màu trắng, được sử dụng trong nhiều món ăn, chủ yếu là nấu hoặc xào.",
                    category: "a1e004be-72cd-4d53-a3ec-76075a76e5b3",

                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Khoai lang",
                    slug: slugify("Khoai lang"),
                    description:
                        "Khoai lang là loại củ có màu tím hoặc cam, được sử dụng trong nhiều món ăn, chủ yếu là nấu hoặc chiên.",
                    category: "a1e004be-72cd-4d53-a3ec-76075a76e5b3",
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Củ đậu xanh",
                    slug: slugify("Củ đậu xanh"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    description:
                        "Củ đậu xanh là loại củ được sử dụng trong nhiều món ăn, chủ yếu là nấu hoặc xào.",
                    category: "a1e004be-72cd-4d53-a3ec-76075a76e5b3",

                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Đậu phộng",
                    slug: slugify("Đậu phộng"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                    description:
                        "Đậu phộng là loại hạt được sử dụng rộng rãi trong các món ăn và đồ uống, chủ yếu là rang và làm bánh.",
                    category: "55737ef0-c483-45ba-ab2e-481883450f0d",
                },
                {
                    id: uuidv4(),
                    name: "Đậu nành",
                    slug: slugify("Đậu nành"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                    description:
                        "Đậu nành là loại đậu được sử dụng rộng rãi trong các món ăn và đồ uống, chủ yếu là nấu và làm tàu hủ.",
                    category: "55737ef0-c483-45ba-ab2e-481883450f0d",
                },
                {
                    id: uuidv4(),
                    name: "Đậu đen",
                    slug: slugify("Đậu đen"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                    description:
                        "Đậu đen là loại đậu có hạt màu đen, được sử dụng trong các món ăn và đồ uống, chủ yếu là nấu súp và làm tàu hủ.",
                    category: "55737ef0-c483-45ba-ab2e-481883450f0d",
                },
                {
                    id: uuidv4(),
                    name: "Đậu xanh",
                    slug: slugify("Đậu xanh"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                    description:
                        "Đậu xanh là loại đậu có hạt màu xanh, được sử dụng trong các món ăn và đồ uống, chủ yếu là nấu súp và làm tàu hủ.",
                    category: "55737ef0-c483-45ba-ab2e-481883450f0d",
                },
                {
                    id: uuidv4(),
                    name: "Đậu đỏ",
                    slug: slugify("Đậu đỏ"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                    description:
                        "Đậu đỏ là loại đậu có hạt màu đỏ, được sử dụng trong các món ăn và đồ uống, chủ yếu là nấu súp và làm tàu hủ.",
                    category: "55737ef0-c483-45ba-ab2e-481883450f0d",
                },
                {
                    id: uuidv4(),
                    name: "Đậu hà lan",
                    slug: slugify("Đậu hà lan"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                    description:
                        "Đậu hà lan là loại đậu có hạt màu trắng, được sử dụng trong các món ăn và đồ uống, chủ yếu là nấu súp và làm tàu hủ.",
                    category: "55737ef0-c483-45ba-ab2e-481883450f0d",
                },
                {
                    id: uuidv4(),
                    name: "Đậu phụ",
                    slug: slugify("Đậu phụ"),
                    thumb: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                    description:
                        "Đậu phụ là loại đậu được sử dụng để làm tàu hủ, chủ yếu là trong các món ăn chay.",
                    category: "55737ef0-c483-45ba-ab2e-481883450f0d",
                },
                {
                    id: uuidv4(),
                    name: "Táo",
                    slug: slugify("Táo"),
                    thumb: "https://example.com/tao.jpg",
                    description:
                        "Táo là loại trái cây có vị ngọt, chua và giòn, được sử dụng rộng rãi trong các món ăn và đồ uống.",
                    category: "c2d90347-b532-45a9-8a8b-15d330497b6c",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Cam",
                    slug: slugify("Cam"),
                    thumb: "https://example.com/cam.jpg",
                    description:
                        "Cam là loại trái cây có vị ngọt và chua, được sử dụng rộng rãi trong các món ăn và đồ uống.",
                    category: "c2d90347-b532-45a9-8a8b-15d330497b6c",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Xoài",
                    slug: slugify("Xoài"),
                    thumb: "https://example.com/xoai.jpg",
                    description:
                        "Xoài là loại trái cây có vị ngọt và chua, được sử dụng rộng rãi trong các món ăn và đồ uống, chủ yếu là trong các món ăn Đông Nam Á.",
                    category: "c2d90347-b532-45a9-8a8b-15d330497b6c",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Chuối",
                    slug: slugify("Chuối"),
                    thumb: "https://example.com/chuoi.jpg",
                    description:
                        "Chuối là loại trái cây có vị ngọt, được sử dụng rộng rãi trong các món ăn và đồ uống, chủ yếu là trong các món ăn chay.",
                    category: "c2d90347-b532-45a9-8a8b-15d330497b6c",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Dâu tây",
                    slug: slugify("Dâu tây"),
                    thumb: "https://example.com/dau-tay.jpg",
                    description:
                        "Dâu tây là loại trái cây có vị ngọt và chua, được sử dụng rộng rãi trong các món ăn và đồ uống, chủ yếu là trong các món tráng miệng.",
                    category: "c2d90347-b532-45a9-8a8b-15d330497b6c",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Nho",
                    slug: slugify("Nho"),
                    thumb: "https://example.com/nho.jpg",
                    description:
                        "Nho là loại trái cây có vị ngọt, được sử dụng rộng rãi trong các món ăn và đồ uống, chủ yếu là trong các món tráng miệng và rượu vang.",
                    category: "c2d90347-b532-45a9-8a8b-15d330497b6c",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Ổi",
                    slug: slugify("Ổi"),
                    thumb: "https://example.com/oi.jpg",
                    description:
                        "Ổi là loại trái cây có vị ngọt và mát, được sử dụng rộng rãi trong các món ăn và đồ uống, chủ yếu là trong các món ăn chay và sinh tố.",
                    category: "c2d90347-b532-45a9-8a8b-15d330497b6c",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Gạo tám xoan",
                    slug: slugify("Gạo tám xoan"),
                    thumb: "https://example.com/gao-tam-xoan.jpg",
                    description:
                        "Gạo tám xoan là loại gạo ngon và đắt tiền, được trồng ở các vùng đất đặc biệt của Việt Nam.",
                    category: "ca9a153d-7b8e-4237-8117-90c0dbf08a71",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Gạo nếp",
                    slug: slugify("Gạo nếp"),
                    thumb: "https://example.com/gao-nep.jpg",
                    description:
                        "Gạo nếp là loại gạo có hạt tròn và dẹt, được sử dụng rộng rãi trong các món ăn chay và làm bánh.",
                    category: "ca9a153d-7b8e-4237-8117-90c0dbf08a71",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: uuidv4(),
                    name: "Gạo lứt",
                    slug: slugify("Gạo lứt"),
                    thumb: "https://example.com/gao-lut.jpg",
                    description:
                        "Gạo lứt là loại gạo được xử lý ít hơn so với gạo trắng thông thường, giữ lại một phần của lớp vỏ, giàu dinh dưỡng hơn và có vị thơm đặc trưng.",
                    category: "ca9a153d-7b8e-4237-8117-90c0dbf08a71",
                    unit: "1kg",
                    price: 2000,
                    quantity: 500,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            { individualHooks: true }
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         *
         */
        await queryInterface.bulkDelete("Products", null, {});
    },
};
