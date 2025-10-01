import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/index'; 

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', apiRoutes); 

app.get('/', (req: Request, res: Response) => {
  res.send('Olá, mundo com Express e TypeScript!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
