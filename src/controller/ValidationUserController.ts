// src/controllers/validationUserController.ts

import { PrismaClient, ValidationUser } from '@prisma/client';

const prisma = new PrismaClient();

// Função para gerar um código aleatório (ex: 6 dígitos)
export function generateRandomCode(length: number = 6): string {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Função para criar um novo código de validação para um usuário
export async function createValidationCode(userId: number, code: string): Promise<ValidationUser> {
  try {
    const newValidation = await prisma.validationUser.create({
      data: {
        userid: userId,
        code: code,
        validationdate: null,
      },
    });
    return newValidation;
  } catch (error) {
    console.error('Erro ao criar código de validação:', error);
    throw error;
  }
}

// Função para buscar um código de validação pelo código e ID do usuário
export async function findValidationCode(userId: number, code: string): Promise<ValidationUser | null> {
  try {
    const validation = await prisma.validationUser.findFirst({
      where: {
        userid: userId,
        code: code,
      },
    });
    return validation;
  } catch (error) {
    console.error('Erro ao buscar código de validação:', error);
    throw error;
  }
}

// Função para marcar um código como validado
export async function validateCode(id: number): Promise<ValidationUser> {
  try {
    const updatedValidation = await prisma.validationUser.update({
      where: {
        id: id,
      },
      data: {
        validationdate: new Date(),
      },
    });
    return updatedValidation;
  } catch (error) {
    console.error('Erro ao validar o código:', error);
    throw error;
  }
}

// Função para deletar um código de validação
export async function deleteValidationCode(id: number): Promise<ValidationUser> {
  try {
    const deletedValidation = await prisma.validationUser.delete({
      where: {
        id: id,
      },
    });
    return deletedValidation;
  } catch (error) {
    console.error('Erro ao deletar o código:', error);
    throw error;
  }
}