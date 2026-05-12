async function ownerMiddleware(req, res, next) {
    const user = req.user;
    const resourceOwnerId = req.params.id;
    if (user.role !== 'admin' && user._id.toString() !== resourceOwnerId) {
        return res.status(403).json({ message: 'Acesso negado. Você não é o proprietário deste recurso.' });
    }
    next();
}


module.exports = { ownerMiddleware };