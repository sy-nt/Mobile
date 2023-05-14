"use strict";
const express = require("express");

const router = express.Router();

router.use("/auth", require("./access"));
router.use("/category", require("./category"))
router.use("/product", require("./product"))

module.exports = router;
