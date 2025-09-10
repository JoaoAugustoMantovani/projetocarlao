import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
// C - Create a new user
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Hash da senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                Name: name,
                Email: email,
                Password: hashedPassword,
            },
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário." });
    }
};
// R - Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                UID: true,
                Name: true,
                Email: true,
                CreatedAt: true,
                UpdatedAt: true,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários." });
    }
};
// R - Get a single user by ID
export const getUserById = async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { UID: uid },
            select: {
                UID: true,
                Name: true,
                Email: true,
                CreatedAt: true,
                UpdatedAt: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuário." });
    }
};
// U - Update a user
export const updateUser = async (req, res) => {
    const { uid } = req.params;
    const { name, email, password } = req.body;
    try {
        const updateData = {};
        if (name)
            updateData.Name = name;
        if (email)
            updateData.Email = email;
        if (password) {
            updateData.Password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await prisma.user.update({
            where: { UID: uid },
            data: updateData,
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
};
// D - Delete a user
export const deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        await prisma.user.delete({
            where: { UID: uid },
        });
        res.status(204).send(); // No content
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao deletar usuário." });
    }
};
//# sourceMappingURL=userController.js.map