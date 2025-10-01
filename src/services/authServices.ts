import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const validateUserAndGenerateToken = async (login: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { login },
  });

  if (!user) {
    return { success: false, message: 'Usuário ou senha inválidos.' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Usuário ou senha inválidos.' };
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('A chave secreta JWT não está definida.');
  }

  const payload = { 
    id: user.id, 
    login: user.login,
    role: user.role 
  };
  
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: '1d', // O token expira em 1 dia
  });

  return { success: true, token };
};