import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

class AuthService {
  async login(req: Request, res: Response) {
    const { login, password } = req.body;

    try {
      // CORREÇÃO: Trocado findUnique por findFirst
      const user = await prisma.user.findUnique({ where: { login } });

      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('A chave secreta JWT não está definida.');
      }

      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return res.status(401).json({ message: 'Token mal formatado.' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: 'Token mal formatado.' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('A chave secreta JWT não está definida.');
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido.' });
      }
      
      return next();
    });
  }
}

export default new AuthService();