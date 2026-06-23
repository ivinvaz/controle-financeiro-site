const Express = require('express');
const router = Express.Router();

const transacaoController = require('../controllers/transacaoController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.post('/criar', authMiddleware, transacaoController.createTransacao);
router.put('/editar/:id', authMiddleware, transacaoController.updateTransacao);
router.delete('/deletar/:id', authMiddleware, transacaoController.deleteTransacao);
router.get('/consultar', authMiddleware, transacaoController.getTransacoes);
router.get('/consultar/:id', authMiddleware, transacaoController.getTransacaoById);

module.exports = router;