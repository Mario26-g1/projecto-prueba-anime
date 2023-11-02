const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
const { ListAnimePre } = require('./models/ListAnimePre');
require('dotenv').config();
const path = require('path');
const createDefaultLists = require('./utils/listPre');

const app = express();

// Middlewares 
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Importa el módulo para crear las listas predeterminadas


// Inicialización de la aplicación
const startApp = async () => {
    // Configura la base de datos y otros componentes de la aplicación
    // Esto puede incluir la configuración de la conexión a la base de datos y otros componentes específicos de tu aplicación

    // Crea las listas predeterminadas en la base de datos durante la inicialización
    await createDefaultLists();

    // Configura rutas y otros componentes de la aplicación
    app.use('/api/v1', router);

    // Ruta de bienvenida
    app.get('/', (req, res) => {
        return res.send("Welcome to express!");
    })

    // Middlewares después de las rutas
    app.use(errorHandler)

    // Inicia el servidor y escucha las solicitudes de los usuarios
};

startApp();

module.exports = app;
