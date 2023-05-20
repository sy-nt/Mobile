"use strict";

const express = require("express");
const router = express.Router();

const CategoryController = require("../../controller/category.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication, isStaff } = require("../../auth/authUtils");

router.get("/", asyncHandler(CategoryController.findAllCategory));

router.use(authentication);
router.post("/:id", isStaff, asyncHandler(CategoryController.updateCategory));
router.post("/", isStaff, asyncHandler(CategoryController.createCategory));

module.exports = router;
