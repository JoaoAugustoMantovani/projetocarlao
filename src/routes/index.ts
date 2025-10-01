import express from 'express';

// Importe todas as suas rotas aqui

import userRoutes from './usersRoutes';

const router = express.Router();

router.use('/users', userRoutes);

export default router;