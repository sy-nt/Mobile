"use strict";

const { OKResponse, CreatedResponse } = require("../core/success.respone");
const CategoryService = require("../services/category.service");

class CategoryController {
    findAllCategory = async (req, res, next) => {
        return new OKResponse({
            message: "Get all categories success",
            metadata: await CategoryService.findAllCategory(),
        }).send(res);
    };

    createCategory = async (req, res, next) => {
        return new CreatedResponse({
            message: "Create category success",
            metadata: await CategoryService.createCategory(req),
        }).send(res);
    };

    updateCategory = async (req, res, next) => {
        return new OKResponse({
            message: "Update category success",
            metadata: await CategoryService.updateCategory({
                id: req.params.id,
                payload: req.body,
            }),
        }).send(res);
    };
}

module.exports = new CategoryController();
