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
		duracion: DataTypes.STRING,
		trailer: DataTypes.STRING,
		genero_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		categoria: {
			type: DataTypes.ENUM("Serie", "Película"),
			allowNull: false,
		},
	},
	{
		tableName: "Catalogo",
		timestamps: false,
	}
);

module.exports = Catalogo;
