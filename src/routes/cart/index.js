"use strict";

const express = require("express");
const router = express.Router();

const CartController = require("../../controller/cart.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication, isAdmin } = require("../../auth/authUtils");

router.use(authentication);
router.post("/add", asyncHandler(CartController.addProductToCart));
router.post("/remove", asyncHandler(CartController.removeProductCart));

module.exports = router;
