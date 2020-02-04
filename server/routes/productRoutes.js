const express = require("express");
const controller = require("../controllers/productController");
const router = express.Router();

router
  .route("/")
  .get(controller.getProducts)
  .post(controller.insertProducts)
  .delete(controller.deleteProducts);

router
  .route("/:id")
  .post(controller.addProduct)
  .delete(controller.deleteProduct);

module.exports = router;
