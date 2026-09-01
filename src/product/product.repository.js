// Berkomunikasi dengan database
// Boleh pake ORM, boleh raw query
// Supaya apa? Supaya kalo mau ganti2 ORM tinggal edit di file ini aja

import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { products } from "../db/schema.js";

const findProducts = async () => {
  return db.select().from(products);
};

const findProductById = async (id) => {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  return product ?? null;
};

const insertProduct = async (productData) => {
  const [insertedProduct] = await db
    .insert(products)
    .values({
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
    })
    .$returningId();

  return findProductById(insertedProduct.id);
};

const deleteProduct = async (id) => {
  await db.delete(products).where(eq(products.id, id));
};

const editProduct = async (id, productData) => {
  await db
    .update(products)
    .set({
      description: productData.description,
      image: productData.image,
      name: productData.name,
      price: productData.price,
    })
    .where(eq(products.id, id));

  return findProductById(id);
};

export {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  editProduct,
};
