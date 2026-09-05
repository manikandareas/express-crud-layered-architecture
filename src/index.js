import "dotenv/config";
import express from "express";
import productController from "./product/product.controller.js";
import todoController from "./todo/todo.controller.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Selamat datang di API akuh");
});

app.use("/products", productController);

app.use("/todos", todoController);

app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});
