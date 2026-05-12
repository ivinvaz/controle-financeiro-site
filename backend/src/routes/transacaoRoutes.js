const Express = require('express');
const router = Express.Router();

const transacaoController = require('../controllers/transacaoController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { ownerMiddleware } = require('../middleware/ownerMiddleware');

router.post('/criar', authMiddleware, transacaoController.createTransacao);
router.put('/editar/:id', authMiddleware, ownerMiddleware, transacaoController.updateTransacao);
router.delete('/deletar/:id', authMiddleware, ownerMiddleware, transacaoController.deleteTransacao);
router.get('/consultar', authMiddleware, ownerMiddleware, transacaoController.getTransacoes);
router.get('/consultar/:id', authMiddleware, ownerMiddleware, transacaoController.getTransacaoById);

module.exports = router;