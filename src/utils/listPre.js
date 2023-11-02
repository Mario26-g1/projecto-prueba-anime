const ListAnimePre = require("../models/ListAnimePre");


const defaultLists = [
    { title: 'Viendo', description: 'Animes que estoy viendo' },
    { title: 'Vistos', description: 'Animes que he visto' },
    { title: 'Por Ver', description: 'Animes que quiero ver' }
];

const createDefaultLists = async () => {
    for (const defaultList of defaultLists) {
        await ListAnimePre.findOrCreate({
            where: { title: defaultList.title },
            defaults: defaultList
        });
    }
};

module.exports = createDefaultLists;
