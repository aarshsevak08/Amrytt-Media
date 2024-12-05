const express = require("express")
const { createCategory } = require("../controller/category")
const { createProduct, getProduct, getProductById, updateProductById, deleteProductById } = require("../controller/product")
const router = express.Router()


router.post("/addproduct",createProduct)
router.get("/getProduct",getProduct)
router.get("/getProductById/:id",getProductById)
router.put("/updateProductById/:id",updateProductById)
router.delete("/deleteProductById/:id",deleteProductById)
 

module.exports = router