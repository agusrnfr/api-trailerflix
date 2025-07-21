const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const Genero = sequelize.define(
	"Genero",
	{
		id_genero: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	},
	{
		tableName: "Genero",
		timestamps: false,
	}
);

module.exports = Genero;
