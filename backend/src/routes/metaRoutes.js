const Express = require('express');
const router = Express.Router();

const metaController = require('../controllers/metaController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.post('/criar', authMiddleware, metaController.createMeta);
router.put('/editar/:id', authMiddleware, metaController.updateMeta);
router.delete('/deletar/:id', authMiddleware, metaController.deleteMeta);
router.get('/consultar', authMiddleware, metaController.getMetas);
router.get('/consultar/:id', authMiddleware, metaController.getMetaById);

module.exports = router;