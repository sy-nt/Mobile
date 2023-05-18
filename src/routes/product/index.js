"use strict";

const express = require("express");
const router = express.Router();

const ProductController = require("../../controller/product.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication, isAdmin } = require("../../auth/authUtils");

router.get(
    "/published",
    asyncHandler(ProductController.getAllPublishedProduct)
);
router.post(
    "/category/:categoryId",
    asyncHandler(ProductController.getProductByCategory)
);
router.post("/search", asyncHandler(ProductController.searchProductWithFilter));

router.get("/id/:id", asyncHandler(ProductController.getProductById));
router.use(authentication);

router.post(
    "/:productId",
    isAdmin,
    asyncHandler(ProductController.updateProduct)
);

router.get("/draft", asyncHandler(ProductController.getAllDraftProduct));
router.post("/", asyncHandler(ProductController.createProduct));
router.post(
    "/draft/:productId",
    isAdmin,
    asyncHandler(ProductController.setDraftProduct)
);
router.post(
    "/published/:productId",
    isAdmin,
    asyncHandler(ProductController.setPublishedProduct)
);

router.post(
    "/comment/:productId",
    asyncHandler(ProductController.reviewProduct)
);

router.get("/all", isAdmin, asyncHandler(ProductController.getAllProduct));

module.exports = router;
