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
router.get("/", getAllUsers);
router.get("/:uid", getUserById);

// Rotas protegidas
router.put("/:uid", authMiddleware, updateUser); // <-- Aplique o middleware
router.delete("/:uid", authMiddleware, deleteUser); // <-- Aplique o middleware

export default router;