import express from "express";
import { getTodoByID, getTodos, postTodo } from "./todo.service.js";

const router = express.Router();

// /todos
router.get("/", async (req, res) => {
  const todos = await getTodos();

  return res.status(200).send({
    success: true,
    message: "Daftar todo berhasil diambil",
    data: todos,
  });
});

router.post("/", async (req, res) => {
  const todo = req.body;

  if (!todo.title || todo.title?.length < 3) {
    return res.status(403).send({
      success: false,
      message: "Validasi input gagal",
      errors: [
        {
          field: "title",
          message: "Field 'title' wajib diisi dan lebih dari 3 karakter",
        },
      ],
    });
  }

  if (req.body.description?.length > 255) {
    return res.status(403).send({
      success: false,
      message: "Validasi input gagal",
      errors: [
        {
          field: "description",
          message: "Field 'description' tidak boleh lebih dari 255 karakter",
        },
      ],
    });
  }

  const due_date = req.body.due_date ? new Date(req.body.due_date) : null;
  const now = new Date();

  if (due_date?.getTime() < now.getTime()) {
    return res.status(403).send({
      success: false,
      message: "Validasi input gagal",
      errors: [
        {
          field: "due_date",
          message: "Field 'due_date' minimal harus lebih dari waktu saat ini",
        },
      ],
    });
  }

  try {
    const createdTodo = await postTodo(todo);

    return res.status(201).send({
      success: true,
      message: "Todo berhasil dibuat",
      data: createdTodo,
    });
  } catch (error) {
    return res.status(505).send({
      success: false,
      message: error.message, // "Todo tidak berhasil disimpan
      errors: [
        {
          field: "description",
          message: "Field 'description' tidak boleh lebih dari 255 karakter",
        },
      ],
    });
  }

  return res.send("POST TODO");
});

// /todos/:id
// /todos/123
// /todos/1234

router.get("/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await getTodoByID(todoId);
    console.log(todo);
    if (!todo) {
      // !todo | ![] | true
      return res.status(404).send({
        success: false,
        message: "Todo dengan ID tersebut tidak ditemukan",
        errors: [],
      });
    }

    return res.status(200).send({
      success: true,
      message: "Detail todo berhasil ditemukan",
      data: todo,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      errors: [],
    });
  }
});

router.put("/:id", (req, res) => {
  return res.send("UPDATE TODO");
});

router.patch("/:id", (req, res) => {
  return res.send("TOGGLE STATUS TODO");
});

router.delete("/:id", (req, res) => {
  return res.send("TODO DELETED");
});

export default router;
