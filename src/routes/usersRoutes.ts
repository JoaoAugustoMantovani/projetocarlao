import { Router } from 'express'; 
import * as myController from '../controllers/usersControllers';
import { authService } from '../controllers/authControllers';

const router = Router();



router.post('/', myController.create);
router.get('/', myController.getAll);
router.get('/:id', myController.getById);
router.put('/:id', myController.update);
router.delete('/:id', myController.erase);
router.get('/pages/:page/limite/:pagesize/column/:orderByColumn/direction/:orderDirection', myController.getPagesAll);
router.put('/activate/:id', myController.activateAccount);

export default router;