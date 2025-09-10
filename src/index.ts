import express, { Request, Response } from 'express';
import dotenv from 'dotenv';


import userRoutes from './routes/userRoutes.js';
import validationUserRoutes from './routes/validationUserRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rotas de autenticação
app.use('/auth', authRoutes);

// As rotas de usuário são prefixadas com /users
app.use('/users', userRoutes);

// As rotas de validação são usadas diretamente
app.use(validationUserRoutes); 

app.get('/', (req: Request, res: Response) => {
  res.send('Olá, mundo com Express e TypeScript!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
