const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Permiso = require('../models/Permiso');
const Rol = require('../models/Rol');


const getAll = catchError(async (req, res) => {
    const results = await User.findAll({
        include: [
            {
                model: Rol,
                attributes: ['title']
            },
            {
                model: Permiso,
                attributes: ['title']
            }
        ]
    });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const { name, email, password } = req.body;
    const rol = await Rol.findOne({ where: { title: 'usuario normal' } });

    if (!rol) {
        return res.status(400).json({ message: 'El rol no se encontró' });
    }

    // Crea el usuario y asigna el rol automáticamente
    const hashPassword = await bcrypt.hash(password, 10);
    const usuario = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        rolId: rol.id
    });

    // Obtén los permisos correspondientes al tipo de usuario
    const permisosUsuarioNormal = await Permiso.findAll({ where: { title: ['Agregar a la lista', 'Crear lista', 'Crear post', 'Crear comentario'] } });

    // Asigna los permisos al usuario
    await usuario.setPermisos(permisosUsuarioNormal);

    const response = {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        rol: rol.title,
        permisos: permisosUsuarioNormal.map(permiso => permiso.title)
    };

    return res.status(201).json(response);
});




const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: { id } });
    if (!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    delete req.body.password;

    const { rolId, permisos, ...updateFields } = req.body; // Excluimos 'password', 'rolId' y capturamos 'permisos'

    // Utilizamos User.update para realizar la actualización de campos excluyendo 'password'
    const [rowsUpdated, [updatedUser]] = await User.update(updateFields, {
        where: { id },
        returning: true // Esto te permite obtener el usuario actualizado
    });

    // Verifica si se actualizó algún usuario
    if (rowsUpdated === 0) {
        return res.sendStatus(404); // No se encontró el usuario para actualizar
    }

    if (rolId !== undefined) {
        // Si se proporcionó un nuevo 'rolId', actualizamos el campo 'rolId' en la base de datos
        await User.update({ rolId }, { where: { id } });
    }

    if (permisos !== undefined) {
        // Si se proporcionaron nuevos permisos, convierte los nombres de permisos en IDs
        const permisosIds = await Permiso.findAll({ where: { title: permisos } });

        if (permisosIds.length > 0) {
            const user = await User.findByPk(id);
            if (user) {
                // Borra todos los permisos existentes del usuario
                await user.setPermisos([]);
                // Asigna los nuevos permisos al usuario
                await user.setPermisos(permisosIds);
            }
        }
    }

    // Verifica si los permisos se actualizaron correctamente
    const updatedUserWithPermisos = await User.findByPk(id, {
        include: [{ model: Permiso, as: 'permisos' }]
    });

    if (updatedUserWithPermisos) {
        return res.json({ updatedUser: updatedUserWithPermisos });
    } else {
        return res.sendStatus(404); // Si no se encontró el usuario actualizado con permisos
    }
});





const login = catchError(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.sendStatus(401);

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.sendStatus(401)

    const token = jwt.sign(
        { user },
        process.env.TOKEN,
        { expiresIn: "1d" }

    )
    return res.json({ user, token })


});

const logged = catchError(async (req, res) => {
    const user = req.user
    return res.json(user)

})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logged
}