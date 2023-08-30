const express = require("express")
const router = express.Router()

const homeController = require("../controllers/homeController")

router.get("/status", homeController.status)

module.exports = router