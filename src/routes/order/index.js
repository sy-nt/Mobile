"use strict";

const express = require("express");
const router = express.Router();

const OrderController = require("../../controller/order.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication, isAdmin } = require("../../auth/authUtils");

router.use(authentication);
router.post("/", asyncHandler(OrderController.createOrder));

module.exports = router;
