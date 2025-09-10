import express from 'express';
import dotenv from 'dotenv';
// Correção: Usando o alias e a extensão .js obrigatória para o Node ESM
import userRoutes from './routes/userRoutes.js';
// Adição: Importando as rotas da ValidationUser
import validationUserRoutes from './routes/validationUserRoutes.js';
// Carrega as variáveis de ambiente do arquivo .env na raiz do projeto
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// As rotas de usuário são prefixadas com /users
app.use('/users', userRoutes);
// As rotas de validação são usadas diretamente, sem prefixo
app.use(validationUserRoutes); // <-- MUDANÇA AQUI
app.get('/', (req, res) => {
    res.send('Olá, mundo com Express e TypeScript!');
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
