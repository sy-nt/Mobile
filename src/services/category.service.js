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

    static updateCategory = async ({ id, payload }) => {
        const cate = await Category.update(payload, {
            where: {
                id,
            },
        });

        if (cate) return true;
        throw new Error("Invalid");
    };

    static isValiCategoryId = async (id) => {
        const categories = await Category.findOne({
            where: {
                id: id,
            },
        });
        if (categories) return true;
        return false;
    };
}

module.exports = CategoryService;
