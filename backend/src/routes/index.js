const Express = require('express');
const router = Express.Router();

const usuarioRoutes = require('./usuarioRoutes');
const transacaoRoutes = require('./transacaoRoutes');
const tipoRoutes = require('./tipoRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const metaRoutes = require('./metaRoutes');

router.use('/usuario', usuarioRoutes);
router.use('/transacao', transacaoRoutes);
router.use('/tipo', tipoRoutes);
router.use('/categoria', categoriaRoutes);
router.use('/meta', metaRoutes);


module.exports = router;