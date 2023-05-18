"use strict";

const express = require("express");
const router = express.Router();

const CategoryController = require("../../controller/category.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication, isAdmin } = require("../../auth/authUtils");

router.get("/", asyncHandler(CategoryController.findAllCategory));

router.use(authentication);
router.post("/:id", isAdmin, asyncHandler(CategoryController.updateCategory));
router.post("/", isAdmin, asyncHandler(CategoryController.createCategory));

module.exports = router;
