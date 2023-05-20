"use strict";

const express = require("express");
const router = express.Router();

const OrderController = require("../../controller/order.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication, isStaff } = require("../../auth/authUtils");

router.use(authentication);
router.post(
    "/:orderId",
    isStaff,
    asyncHandler(OrderController.updateStatusOrder)
);
router.post("/", asyncHandler(OrderController.placeOrder));
router.get("/", isStaff, asyncHandler(OrderController.getAllOrder));

module.exports = router;
