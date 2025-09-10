import express from 'express';
import { findValidationCode, validateCode, deleteValidationCode, } from '../controller/ValidationUserController.js';
import { updateEmailValidationStatus } from '../controller/userController.js';
const router = express.Router();
// Rota para validar um usuário com um código
router.post('/validate', async (req, res) => {
    const { userId, code } = req.body;
    if (!userId || !code) {
        return res.status(400).json({ error: 'ID do usuário e código de validação são obrigatórios.' });
    }
    try {
        const validationEntry = await findValidationCode(userId, code);
        // 1. Verifica se o código de validação existe e não foi usado
        if (!validationEntry || validationEntry.validationdate) {
            return res.status(400).json({ error: 'Código de validação inválido ou expirado.' });
        }
        // 2. Marca o código como validado no banco de dados
        const updatedValidation = await validateCode(validationEntry.id);
        // 3. Atualiza o status de validação do usuário
        await updateEmailValidationStatus(userId, true);
        return res.status(200).json({ message: 'Usuário validado com sucesso!' });
    }
    catch (error) {
        console.error('Erro na validação do usuário:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
// Rota para deletar um código de validação
router.delete('/:id', async (req, res) => {
    const validationId = parseInt(req.params.id, 10);
    if (isNaN(validationId)) {
        return res.status(400).json({ error: 'ID de validação inválido.' });
    }
    try {
        const deleted = await deleteValidationCode(validationId);
        return res.status(200).json({ message: 'Código de validação deletado com sucesso.', deleted });
    }
    catch (error) {
        console.error('Erro ao deletar código:', error);
        return res.status(500).json({ error: 'Erro ao deletar o código de validação.' });
    }
});
export default router;
