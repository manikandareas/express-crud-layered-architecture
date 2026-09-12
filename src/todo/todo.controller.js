import express from "express";
import {
  deleteTodoByID,
  getTodoByID,
  getTodos,
  postTodo,
  putTodoByID,
} from "./todo.service.js";

const router = express.Router();

// /todos?page=1&limit=10&offset=0

// https://www.youtube.com/watch?v=wGjHvBlRpLo
router.get("/", async (req, res) => {
  // page=10 -> 10 number
  // page=ok -> error
  // Number(req.query.page) || 1
  // Number("gwjago") ? error dong itu bukan nomor
  //  Number("gwjago") => nan => not a number

  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 10));
  const offset = (page - 1) * limit;

  const result = await getTodos(page, limit, offset);

  return res.status(200).send({
    success: true,
    message: "Daftar todo berhasil diambil",
    data: result.data,
    meta: result.meta,
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
});

router.get("/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await getTodoByID(todoId);
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

router.put("/:id", async (req, res) => {
  const todo = req.body;
  const todoId = req.params.id;

  if (
    !(
      todo.title &&
      todo.description &&
      todo.due_date &&
      todo.priority &&
      todo.is_completed
    )
  ) {
    return res.status(400).send("Some fields are missing");
  }

  try {
    const result = await putTodoByID(todoId, todo);

    if (result.status === 404) {
      return res.status(404).send({
        success: false,
        message: "Todo dengan ID tersebut tidak ditemukan",
        errors: [],
      });
    }
    // naming | pemberian nama
    return res.status(200).send({
      success: true,
      message: "Todo berhasil di update",
      data: result.data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      errors: [],
    });
  }
});

router.patch("/:id", async (req, res) => {
  const todo = req.body;
  const todoId = req.params.id;

  if (
    !(
      todo.title &&
      todo.description &&
      todo.due_date &&
      todo.priority &&
      todo.is_completed
    )
  ) {
    return res.status(400).send("Some fields are missing");
  }

  try {
    const result = await putTodoByID(todoId, todo);

    if (result.status === 404) {
      return res.status(404).send({
        success: false,
        message: "Todo dengan ID tersebut tidak ditemukan",
        errors: [],
      });
    }
    // naming | pemberian nama
    return res.status(200).send({
      success: true,
      message: "Todo berhasil di update",
      data: result.data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      errors: [],
    });
  }
});

router.delete("/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    const result = await deleteTodoByID(todoId);

    if (result.status === 404) {
      return res.status(404).send({
        success: false,
        message: "Todo dengan ID tersebut tidak ditemukan",
        errors: [],
      });
    }

    return res.status(200).send({
      success: true,
      message: "Todo berhasil dihapus",
      data: null,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      errors: [],
    });
  }
});

export default router;
