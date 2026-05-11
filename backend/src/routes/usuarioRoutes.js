const Express = require('express');
const router = Express.Router();

const usuarioController = require('../controllers/usuarioController');

router.post('/registrar', usuarioController.cadastrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.put('editar/:id', usuarioController.editarUsuario);
router.delete('/deletar/:id', usuarioController.deletarUsuario);
router.get('/', usuarioController.listarUsuarios);
router.get('consultar/:id', usuarioController.obterUsuarioPorId);