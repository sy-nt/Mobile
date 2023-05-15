"use strict";

const { OKResponse, CreatedResponse } = require("../core/success.respone");
const ProductService = require("../services/product.service");

class ProductController {
    setPublishedProduct = async (req, res, next) => {
        return new OKResponse({
            message: "Set status product success",
            metadata: await ProductService.setPublishedProduct({
                productId: req.params.productId,
            }),
        }).send(res);
    };

    setDraftProduct = async (req, res, next) => {
        return new OKResponse({
            message: "Set status product success",
            metadata: await ProductService.setDraftProduct({
                productId: req.params.productId,
            }),
        }).send(res);
    };

    getAllPublishedProduct = async (req, res, next) => {
        return new OKResponse({
            message: "Get list product success",
            metadata: await ProductService.getAllPublishedProduct({}),
        }).send(res);
    };

    getAllDraftProduct = async (req, res, next) => {
        return new OKResponse({
            message: "Get list product success",
            metadata: await ProductService.getAllDraftProduct({}),
        }).send(res);
    };

    createProduct = async (req, res, next) => {
        return new CreatedResponse({
            message: "Create product",
            metadata: await ProductService.createProduct(req),
        }).send(res);
    };

    updateProduct = async (req, res, next) => {
        return new OKResponse({
            message: "Update product success",
            metadata: await ProductService.updateProduct({
                productId: req.params.productId,
                product: req.body,
            }),
        }).send(res);
    };

    searchProductWithFilter = async (req, res, next) => {
        return new OKResponse({
            message: "Search product success",
            metadata: await ProductService.searchProductWithFilter({
                search: req.body.search,
            }),
        }).send(res);
    };

    reviewProduct = async (req, res, next) => {
        return new OKResponse({
            message: "Review product success",
            metadata: await ProductService.reviewProduct({
                review: req.body,
                productId: req.params.productId,
                email: req.user.email,
            }),
        }).send(res);
    };
}

module.exports = new ProductController();
