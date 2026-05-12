const Express = require('express');
const router = Express.Router();

const categoriaController = require('../controllers/categoriaController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

router.post('/criar', authMiddleware, roleMiddleware, categoriaController.createCategoria);
router.patch('/editar/:id', authMiddleware, roleMiddleware, categoriaController.updateCategoria);
router.delete('/deletar/:id', authMiddleware, roleMiddleware, categoriaController.deleteCategoria);
router.get('/consultar/', authMiddleware, categoriaController.getCategorias);
router.get('/consultar/:id', authMiddleware, categoriaController.getCategoriaById);

module.exports = router;