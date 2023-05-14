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
router.post("/:productId", asyncHandler(ProductController.updateProduct));

router.use(authentication);

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

module.exports = router;
