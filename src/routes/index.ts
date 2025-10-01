import express from 'express';

// Importando Rotas
import authRoutes from './authRoutes';
import userRoutes from './usersRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;