async function roleMiddleware(req, res, next) {
    const user = req.user;
    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
    }
    next();
}

module.exports = { roleMiddleware };