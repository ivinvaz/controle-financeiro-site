const Express = require('express');
const router = Express.Router();

const metaController = require('../controllers/metaController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { ownerMiddleware } = require('../middleware/ownerMiddleware');

router.post('/criar', authMiddleware, metaController.createMeta);
router.put('/editar/:id', authMiddleware, ownerMiddleware, metaController.updateMeta);
router.delete('/deletar/:id', authMiddleware, ownerMiddleware, metaController.deleteMeta);
router.get('/consultar', authMiddleware, ownerMiddleware, metaController.getMetas);
router.get('/consultar/:id', authMiddleware, ownerMiddleware, metaController.getMetaById);

module.exports = router;