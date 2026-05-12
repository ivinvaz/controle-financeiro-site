const Express = require('express');
const router = Express.Router();

const tipoController = require('../controllers/tipoController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.post('/criar', authMiddleware, roleMiddleware, tipoController.createTipo);
router.patch('/editar/:id', authMiddleware, roleMiddleware, tipoController.updateTipo);
router.delete('/deletar/:id', authMiddleware, roleMiddleware, tipoController.deleteTipo);
router.get('/consultar/', authMiddleware, tipoController.getTipos);
router.get('/consultar/:id', authMiddleware, tipoController.getTipoById);

module.exports = router;