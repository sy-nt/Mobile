"use strict";

const express = require("express");
const router = express.Router();

const OrderController = require("../../controller/order.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication, isAdmin } = require("../../auth/authUtils");

router.use(authentication);
router.post("/:orderId", asyncHandler(OrderController.updateStatusOrder));
router.post("/", asyncHandler(OrderController.placeOrder));
router.get("/", isAdmin, asyncHandler(OrderController.getAllOrder));

module.exports = router;
