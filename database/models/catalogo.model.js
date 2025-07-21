const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const Catalogo = sequelize.define(
	"Catalogo",
	{
		id_catalogo: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		poster: DataTypes.STRING,
		titulo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		resumen: DataTypes.STRING(1024),
		temporadas: DataTypes.INTEGER,
		trailer: DataTypes.STRING,
		genero: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		categoria: {
			type: DataTypes.ENUM("Serie", "Pelicula"),
			allowNull: false,
		},
	},
	{
		tableName: "Catalogo",
		timestamps: false,
	}
);

module.exports = Catalogo;
