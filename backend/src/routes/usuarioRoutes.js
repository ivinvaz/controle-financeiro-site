const Express = require('express');
const router = Express.Router();

const usuarioController = require('../controllers/usuarioController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { ownerMiddleware } = require('../middleware/ownerMiddleware');

router.post('/registrar', usuarioController.createUsuario);
router.post('/login', usuarioController.login);
router.patch('/editar/:id', authMiddleware, ownerMiddleware, usuarioController.updateUsuario);
router.delete('/deletar/:id', authMiddleware, ownerMiddleware, usuarioController.deleteUsuario);
router.get('/', authMiddleware, roleMiddleware, usuarioController.getUsuario);
router.get('/consultar/:id', authMiddleware, ownerMiddleware, usuarioController.getUsuarioById);

module.exports = router;