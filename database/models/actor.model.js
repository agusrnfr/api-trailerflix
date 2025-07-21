const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const Actor = sequelize.define(
	"Actor",
	{
		id_actor: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: DataTypes.STRING,
		apellido: DataTypes.STRING,
	},
	{
		tableName: "Actor",
		timestamps: false,
	}
);

module.exports = Actor;
