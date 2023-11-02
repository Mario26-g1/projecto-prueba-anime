const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Permiso = require('../models/Permiso');
const Rol = require('../models/Rol');
const Image = require('../models/Image');
const fs = require('fs')
const path = require('path')





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

// const create = catchError(async (req, res) => {
//     const { name, email, password, profilePicture } = req.body;
//     //const rol = await Rol.findOne({ where: { title: 'usuario normal' } });

//     // if (!rol) {
//     //     return res.status(400).json({ message: 'El rol no se encontró' });
//     // }

//     // Crea el usuario y asigna el rol automáticamente
//     const hashPassword = await bcrypt.hash(password, 10);
//     const usuario = await User.create({
//         name: name,
//         email: email,
//         password: hashPassword,
//         profilePicture: profilePicture,
//         //rolId: rol.id
//     });

//     // Obtén los permisos correspondientes al tipo de usuario
//     // const permisosUsuarioNormal = await Permiso.findAll({ where: { title: ['Agregar lista', 'Crear lista', 'Crear post', 'Crear comment'] } });

//     // // Asigna los permisos al usuario
//     // await usuario.setPermisos(permisosUsuarioNormal);

//     // const response = {
//     //     id: usuario.id,
//     //     name: usuario.name,
//     //     email: usuario.email,
//     //     profilePicture: usuario.profilePicture,
//     //     rol: rol.title,
//     //     permisos: permisosUsuarioNormal.map(permiso => permiso.title)
//     // };

//     return res.status(201).json(usuario);
// });

const create = catchError(async (req, res) => {
    const { name, email, password } = req.body; // Datos del usuario
    const hashPassword = password ? await bcrypt.hash(password, 10) : null;

    let imageResult = null; // Inicializamos imageResult como nulo

    if (req.file) {
        // Si req.file está definido (es decir, se proporcionó una imagen), creamos una entrada de imagen
        const { filename } = req.file;
        const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`;
        imageResult = await Image.create({ filename, url });
    }

    // Luego, creamos una entrada de usuario en la base de datos, asociando la imagen si está definida
    const result = await User.create({
        name,
        email,
        password: hashPassword,
        profilePicture: imageResult ? `${imageResult.url}` : null // Asociamos la ID de la imagen de perfil si existe
    });

    return res.status(201).json(result);
});




const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

// Rutas


// Controlador
// const remove = catchError(async (req, res) => {
//     const { id } = req.params;

//     // Busca al usuario por su ID
//     const user = await User.findByPk(id);

//     if (!user) {
//         return res.sendStatus(404); // Si no se encuentra el usuario, devuelve 404
//     }

//     // Si el usuario tiene una imagen de perfil, obtén su ID
//     const imageId = user.profilePicture ? user.profilePicture.id : null;

//     // Elimina al usuario
//     await user.destroy();

//     if (imageId) {
//         // Si se encontró una imagen de perfil, elimina la imagen
//         const image = await Image.findByPk(imageId);
//         if (image) {
//             // Si se encuentra la imagen, elimínala
//             await image.destroy();
//         }
//     }

//     return res.sendStatus(204); // Devuelve un código 204 (No Content) si todo se elimina con éxito
// });

// const remove = catchError(async (req, res) => {
//     const userId = req.params.id;


//     // Busca al usuario por su ID
//     const user = await User.findByPk(userId);

//     if (!user) {
//         return res.sendStatus(404); // Si no se encuentra el usuario, devuelve 404
//     }

//     // Si el usuario tiene una imagen de perfil, obtén su ID y el nombre del archivo
//     const imageId = user.profilePicture ? user.profilePicture.userId : null;
//     const filename = user.profilePicture ? user.profilePicture.filename : null;

//     // Elimina al usuario
//     await user.destroy();

//     if (imageId) {
//         // Si se encontró una imagen de perfil, elimina la imagen de la base de datos
//         const image = await Image.findByPk(imageId);
//         if (image) {
//             await image.destroy();

//             // Si se encontró la imagen, elimina el archivo físico de la carpeta de "images"
//             if (filename) {
//                 const filePath = path.join(__dirname, '..', 'public', 'images', filename);
//                 fs.unlinkSync(filePath);
//             }
//         }
//     }

//     return res.sendStatus(204); // Devuelve un código 204 (No Content) si todo se elimina con éxito
// });

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: { id } })
    if (!result) return res.sendStatus(404);

    return res.sendStatus(204)
})




// const update = catchError(async (req, res) => {
//     const { id } = req.params;
//     delete req.body.password;

//     const { rolId, permisos, ...updateFields } = req.body; // Excluimos 'password', 'rolId' y capturamos 'permisos'

//     // Utilizamos User.update para realizar la actualización de campos excluyendo 'password'
//     const [rowsUpdated, [updatedUser]] = await User.update(updateFields, {
//         where: { id },
//         returning: true // Esto te permite obtener el usuario actualizado
//     });

//     // Verifica si se actualizó algún usuario
//     if (rowsUpdated === 0) {
//         return res.sendStatus(404); // No se encontró el usuario para actualizar
//     }

//     if (rolId !== undefined) {
//         // Si se proporcionó un nuevo 'rolId', actualizamos el campo 'rolId' en la base de datos
//         await User.update({ rolId }, { where: { id } });
//     }

//     if (permisos !== undefined) {
//         // Si se proporcionaron nuevos permisos, convierte los nombres de permisos en IDs
//         const permisosIds = await Permiso.findAll({ where: { title: permisos } });

//         if (permisosIds.length > 0) {
//             const user = await User.findByPk(id);
//             if (user) {
//                 // Borra todos los permisos existentes del usuario
//                 await user.setPermisos([]);
//                 // Asigna los nuevos permisos al usuario
//                 await user.setPermisos(permisosIds);
//             }
//         }
//     }

//     // Verifica si los permisos se actualizaron correctamente
//     const updatedUserWithPermisos = await User.findByPk(id, {
//         include: [{ model: Permiso, as: 'permisos' }]
//     });

//     if (updatedUserWithPermisos) {
//         return res.json({ updatedUser: updatedUserWithPermisos });
//     } else {
//         return res.sendStatus(404); // Si no se encontró el usuario actualizado con permisos
//     }
// });


const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { name, email, profilePicture, biografy } = req.body; // Datos del usuario, incluyendo la imagen

    // Verifica si se proporcionó una nueva imagen de perfil
    if (profilePicture) {
        // Si se proporcionó una imagen de perfil, crea una entrada de imagen en la base de datos
        const url = `${req.protocol}://${req.headers.host}/uploads/${profilePicture.filename}`;
        const imageResult = await Image.create({ filename: profilePicture.filename, url });

        // Actualiza el usuario incluyendo el nuevo ID de la imagen de perfil
        await User.update({ name, email, profilePicture: imageResult.id, biografy }, { where: { id } });
    } else {
        // Si no se proporcionó una nueva imagen de perfil, actualiza el usuario sin modificar la imagen
        await User.update({ name, email, biografy }, { where: { id } });
    }

    const updatedUser = await User.findByPk(id);

    if (!updatedUser) return res.sendStatus(404);

    return res.json(updatedUser);
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