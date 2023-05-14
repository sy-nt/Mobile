"use strict";

const express = require("express");
const router = express.Router();

const UserController = require("../../controller/user.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");

router.post("/verify", asyncHandler(UserController.activeUser));
router.post("/otp", asyncHandler(UserController.sendOTP));

router.use(authentication);
router.post("/", asyncHandler(UserController.updateUser));

module.exports = router;
