const { Router } = require('express');
const productsController = require('./productsController.js');
const router = Router();

router.get("/", (req, res) => {
  try {
    productsController.getProducts((err, results) => {
      if (err) {
        return res.status(400).send(err)
      }
      return res.status(200).send({ STATUS: "OK", data: results })
    });
  } catch (err) {
    return res.status(500).send("Try after sometime")
  }
});

router.get("/:productId", (req, res) => {
  try {
    const productId = req.params.productId

    productsController.getProductById(productId, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });

  } catch (err) {
    return res.status(500).send('Try after sometime');
  }
});

router.post("/", (req, res) => {
  try {
    const productDetails = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity
    }
    productsController.saveProductDetails(productDetails, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(201).send({ STATUS: "OK", data: results });
    });

  } catch (err) {
    return res.status(500).send('Try after sometime');
  }
});

router.delete("/:productId", (req, res) => {
  try {
    const productId = req.params.productId

    productsController.deleteProductById(productId, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });

  } catch (err) {
    return res.status(500).send('Try after sometime');
  }
});

module.exports = router;



