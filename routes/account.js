const express = require("express")
const router = express.Router();
const accountRoutes = require('../db_handlers/account.js')

router.use(accountRoutes)
module.exports = router;