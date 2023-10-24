const Anime = require("./Anime");
const Comment = require("./Comment");
const Genre = require("./Genre");
const Image = require("./Image");
const ListAnime = require("./ListAnime");
const New = require("./New");
const Permiso = require("./Permiso");
const Post = require("./Post");
const Review = require("./Review");
const Rol = require("./Rol");
const User = require("./User");

//======== Relacion de User========

User.hasMany(Anime)//userId
Anime.belongsTo(User)

User.hasMany(Comment)//userId
Comment.belongsTo(User)

User.hasMany(Genre)//userId
Genre.belongsTo(User)

User.hasMany(ListAnime)//userId
ListAnime.belongsTo(User)

User.hasMany(Post)//userId
Post.belongsTo(User)

User.hasMany(New)//userId
New.belongsTo(User)

User.hasMany(Review)//userId
Review.belongsTo(User)

User.belongsTo(Rol);


User.belongsToMany(Permiso, { through: 'UsersPermiso' })
Permiso.belongsToMany(User, { through: 'UsersPermiso' })


//======== Relacion restante=========//

Anime.hasMany(ListAnime)//animeId
ListAnime.belongsTo(Anime)

Anime.hasMany(Comment)//animeId
Comment.belongsTo(Anime)

Anime.hasMany(Genre)//animeId
Genre.belongsTo(Anime)

Anime.hasMany(Review)//animeId
Review.belongsTo(Anime)



//==============================

Post.hasMany(Comment)//postId
Comment.belongsTo(Post)

Review.hasMany(Comment)//ReviewId
Comment.belongsTo(Review)

Image.belongsTo(Anime)//animeId
Anime.hasMany(Image)












