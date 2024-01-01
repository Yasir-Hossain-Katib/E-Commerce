const express=  require("express");
const router=express.Router();
const productController=require("../controllers/productController");

router.get("/products",productController.getProducts);
router.get("/products/:productId",productController.getSingleProduct);
router.post("/products",productController.addProduct);
router.put("/products/:productId",productController.updateProduct);
router.delete("/products/:productId",productController.deleteProduct);

module.exports= router;