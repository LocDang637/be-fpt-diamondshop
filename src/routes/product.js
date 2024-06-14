const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

router.post("/product", productController.create);

router.get("/product", productController.findAll);

router.get("/product/:id", productController.findOne);

router.put("/product/:id", productController.update);

router.delete("/product/:id", productController.delete);

module.exports = router;
