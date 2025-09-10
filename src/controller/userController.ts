import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createValidationCode, generateRandomCode } from './ValidationUserController.js';

const prisma = new PrismaClient();

// C - Create a new user (Função ATUALIZADA)
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, isActive, cellphone } = req.body;

  if (!name || !email || !password || !cellphone) {
    return res.status(400).json({ error: "Campos obrigatórios (name, email, password, cellphone) não foram enviados." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Altere o `emailValidation` para sempre ser `false` no momento da criação
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isActive: isActive === undefined ? true : isActive,
        cellphone,
        emailValidation: false // Sempre inicie como false
      },
    });

    // Passo 1: Gerar o código de validação (usando uma função que será criada).
    const validationCode = generateRandomCode();

    // Passo 2: Chamar a função para salvar o código na tabela de validação.
    await createValidationCode(newUser.id, validationCode);

    // Passo 3: Retornar o novo usuário e o código de validação para teste.
    res.status(201).json("User Created Successfully");
  } catch (error) {
    console.error(error);
    if ((error as any).code === 'P2002') {
      return res.status(409).json({ error: "O e-mail fornecido já está em uso." });
    }
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
};

// R - Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdat: true,
        updatedat: true,
        emailValidation: true,

      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

// R - Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(uid) },
      select: {
        id: true,
        name: true,
        email: true,
        createdat: true,
        updatedat: true,
        emailValidation: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
};

// U - Update a user
export const updateUser = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const { name, email, password } = req.body;

  try {
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(uid) },
      data: updateData,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

// D - Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const userId = Number(uid);

  if (isNaN(userId)) {
    return res.status(4.00).json({ error: "ID de usuário inválido." });
  }

  try {
    // Usar uma transação para garantir que ambas as operações funcionem
    await prisma.$transaction([
      // 1. Deletar os registros de validação associados
      prisma.validationUser.deleteMany({
        where: { userid: userId },
      }),
      // 2. Deletar o usuário
      prisma.user.delete({
        where: { id: userId },
      }),
    ]);

    return res.status(200).json({ message: "User Deleted" }); // 204 No Content para sucesso na exclusão
  } catch (error: any) {
    // Se o usuário não for encontrado, o Prisma lança um erro com o código P2025
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
};

// Nova função para atualizar o status de validação do e-mail
export const updateEmailValidationStatus = async (userId: number, status: boolean) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { emailValidation: status },
    });
  } catch (error) {
    console.error("Erro ao atualizar status de validação do email:", error);
    throw error;
  }
};