import { Router } from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, } from "../controller/userController.js"; // <-- CORRIGIDO AQUI
const router = Router();
// Rotas para as operações de CRUD
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:uid", getUserById);
router.put("/:uid", updateUser);
router.delete("/:uid", deleteUser);
export default router;
