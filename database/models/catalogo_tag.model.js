const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const Catalogo_Tag = sequelize.define(
	"Catalogo_Tag",
	{
		id_catalogo: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		id_tag: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
	},
	{
		tableName: "Catalogo_Tag",
		timestamps: false,
	}
);

module.exports = Catalogo_Tag;
