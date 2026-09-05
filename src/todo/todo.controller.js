import express from "express";
import { getTodos } from "./todo.service.js";

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

router.post("/", (req, res) => {
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

  return res.send("POST TODO");
});

// /todos/:id
router.get("/:id", (req, res) => {
  return res.send("DETAIL TODO");
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
