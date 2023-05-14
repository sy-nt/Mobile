"use strict";

const express = require("express");
const router = express.Router();
const AccessController = require("../../controller/access.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");

router.post("/signup", asyncHandler(AccessController.signUp));
router.post("/login", asyncHandler(AccessController.login));

router.use(authentication);
router.post(
    "/handleRefreshToken",
    asyncHandler(AccessController.handleRefreshToken)
);
router.get("/logout", asyncHandler(AccessController.logout));

module.exports = router;
