import { Router } from 'express';
import authController from '../controllers/authControllers';

const router = Router();

router.post('/login', authController.login);

export default router;