import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // <-- Importe o middleware

const router = Router();

// Rotas públicas
router.post("/", createUser);

// Rotas protegidas - Todas as outras rotas de usuário
router.get("/", authMiddleware, getAllUsers);
router.get("/:uid", authMiddleware, getUserById);
router.put("/:uid", authMiddleware, updateUser);
router.delete("/:uid", authMiddleware, deleteUser);


export default router;