"use strict";
const { Category } = require("../models");
const { v4: uuidv4 } = require("uuid");

class CategoryService {
    static findAllCategory = async () => {
        const categories = await Category.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return {
            categories: JSON.parse(JSON.stringify(categories, null, 2)),
        };
    };

    static createCategory = async (req) => {
        console.log(req.body);
        const category = await Category.create({
            ...req.body,
            id: uuidv4(),
        });
        return {
            category: category.dataValues,
        };
    };
}

module.exports = CategoryService;
