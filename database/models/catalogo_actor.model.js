const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const Catalogo_Actor = sequelize.define(
	"Catalogo_Actor",
	{
		id_catalogo: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		id_actor: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
	},
	{
		tableName: "Catalogo_Actor",
		timestamps: false,
	}
);

module.exports = Catalogo_Actor;
