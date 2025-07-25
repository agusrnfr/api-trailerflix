const Catalogo = require("./catalogo.model");
const Genero = require("./genero.model");
const Actor = require("./actor.model");
const Tag = require("./tag.model");
const Catalogo_Tag = require("./catalogo_tag.model");
const Catalogo_Actor = require("./catalogo_actor.model");

Catalogo.belongsTo(Genero, { foreignKey: "genero_id" });
Genero.hasMany(Catalogo, { foreignKey: "genero_id" });
Catalogo.belongsToMany(Tag, {
	through: Catalogo_Tag,
	foreignKey: "id_catalogo",
	onDelete: "CASCADE",
});
Tag.belongsToMany(Catalogo, {
	through: Catalogo_Tag,
	foreignKey: "id_tag",
	onDelete: "CASCADE",
});

Catalogo.belongsToMany(Actor, {
	through: Catalogo_Actor,
	foreignKey: "id_catalogo",
	onDelete: "CASCADE",
});
Actor.belongsToMany(Catalogo, {
	through: Catalogo_Actor,
	foreignKey: "id_actor",
	onDelete: "CASCADE",
});

module.exports = {
	Catalogo,
	Genero,
	Actor,
	Tag,
	Catalogo_Tag,
	Catalogo_Actor,
};
