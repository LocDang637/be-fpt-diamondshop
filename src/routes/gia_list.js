const express = require("express");
const router = express.Router();
const giaListController = require("../controllers/gia_list");

router.post("/gia_list", giaListController.create);

router.get("/gia_list", giaListController.findAll);

router.get("/gia_list/:id", giaListController.findOne);

router.put("/gia_list/:id", giaListController.update);

router.delete("/gia_list/:id", giaListController.delete);

module.exports = router;
