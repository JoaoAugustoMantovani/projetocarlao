import { Request, Response } from 'express';
import authService from '../services/authServices'; 

class AuthController {
  async login(req: Request, res: Response) {
    await authService.login(req, res);
  }
}

export default new AuthController();