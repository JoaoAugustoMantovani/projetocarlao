import { Router } from 'express'; 
import * as myController from '../controllers/usersControllers';
import authService from '../services/authServices';

const router = Router();


// Rota pública (não precisa de autenticação)
router.post('/', myController.create);

// A partir daqui, todas as rotas exigirão autenticação
// O método verifyToken será usado como middleware de autenticação JWT
router.use(authService.verifyToken);

router.get('/', myController.getAll);
router.get('/:id', myController.getById);
router.put('/:id', myController.update);
router.delete('/:id', myController.erase);
router.get('/pages/:page/limite/:pagesize/column/:orderByColumn/direction/:orderDirection', myController.getPagesAll);
router.put('/activate/:id', myController.activateAccount);


export default router;