"use strict";
const { Category } = require("../models");
const { v4: uuidv4 } = require("uuid");

class CategoryService {
    static findAllCategory = async () => {
        const categories = await Category.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        if (categories) return JSON.parse(JSON.stringify(categories, null, 2));
        return null;
    };

    static createCategory = async (req) => {
        const category = await Category.create({
            ...req.body,
        });
        if (category) return category.dataValues;
        return null;
    };
}

module.exports = CategoryService;
