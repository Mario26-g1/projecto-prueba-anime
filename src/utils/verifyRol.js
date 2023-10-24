function verifyRol(rol) {
    return (req, res, next) => {
        if (req.user && req.user.id === rol) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado' });
        }
    };
}

module.exports = verifyRol;