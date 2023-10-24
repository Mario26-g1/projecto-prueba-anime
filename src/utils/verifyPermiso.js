// const verifyPermiso = (permiso) => {
//     return (req, res, next) => {
//         // Verifica si el usuario tiene el permiso en función de su rol
//         if (req.user && req.user.permisos && req.user.permisos.includes(permiso)) {
//             next();
//         } else {
//             res.status(403).json({ message: 'Acceso denegado' });
//         }
//     };
// };

// const verifyAllPermisos = (req, res, next) => {
//     if (req.user && req.user.permisos && req.user.permisos.length > 0) {
//         // Verifica que el usuario tenga al menos un permiso asignado
//         next();
//     } else {
//         res.status(403).json({ message: 'Acceso denegado' });
//     }
// };

// module.exports = verifyAllPermisos;


// module.exports = verifyPermiso;


const verifyAllPermisos = (req, res, next) => {
    // Obtén la lista completa de permisos en tu sistema
    const permisosTotales = obtenerPermisosTotales(); // Debes implementar esta función

    if (req.user && req.user.permisos) {
        const tieneTodosLosPermisos = permisosTotales.every(permiso => req.user.permisos.includes(permiso));

        if (tieneTodosLosPermisos) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado' });
        }
    } else {
        res.status(403).json({ message: 'Acceso denegado' });
    }
};
function obtenerPermisosTotales() {
    // En este ejemplo, retornamos una lista de permisos estática.
    // En tu aplicación real, esto podría implicar una consulta a la base de datos o alguna otra fuente de datos.
    return [
        'Crear comentario',
        // 'editar comentario',
        // 'eliminar comentario',
        // 'publicar post',
        // 'editar post',
        // 'eliminar post'
        // Agrega aquí todos los permisos en tu sistema
    ];
}

module.exports = obtenerPermisosTotales;

module.exports = verifyAllPermisos;