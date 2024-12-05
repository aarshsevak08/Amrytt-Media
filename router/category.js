const express = require("express")
const { createCategory } = require("../controller/category")
const router = express.Router()


router.post("/addcategory",createCategory)
 

module.exports = router