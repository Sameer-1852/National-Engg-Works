const express = require("express");
const router = express.Router();
const {DemoAPIs} = require("../Controller/Demo.controller.js");


router.get("/Demo",DemoAPIs);

module.exports = router