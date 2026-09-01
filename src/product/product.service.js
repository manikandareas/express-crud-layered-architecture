// Service layer bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable

import {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  editProduct,
} from "./product.repository.js";

const getAllProducts = async () => {
  const products = await findProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const createProduct = async (newProductData) => {
  const product = await insertProduct(newProductData);

  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);

  await deleteProduct(id);
};

const editProductById = async (id, productData) => {
  await getProductById(id);

  const product = await editProduct(id, productData);

  return product;
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
