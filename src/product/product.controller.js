// Layer untuk handle request dan response
// Biasanya juga handle validasi body

import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} from "./product.service.js";

const router = express.Router();

// /products
router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products);
});

// /products/:id
router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id); // 2, 4, 5
    const product = await getProductById(parseInt(productId));

    res.send(product);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);

    res.send({
      data: product,
      message: "create product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id; // string

    await deleteProductById(parseInt(productId));

    res.send("product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.image &&
      productData.description &&
      productData.name &&
      productData.price
    )
  ) {
    return res.status(400).send("Some fields are missing");
  }

  const product = await editProductById(parseInt(productId), productData);

  res.send({
    data: product,
    message: "edit product success",
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(parseInt(productId), productData);

    res.send({
      data: product,
      message: "edit product success",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
