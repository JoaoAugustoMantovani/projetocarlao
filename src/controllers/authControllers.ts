import { Request, Response } from 'express';
import * as authService from '../services/authServices'

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Login e senha são obrigatórios.' });
  }

  try {
    const result = await authService.validateUserAndGenerateToken(login, password);
    
    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }
    
    res.json({ token: result.token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro interno.' });
  }
};