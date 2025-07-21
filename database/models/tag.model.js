const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const Tag = sequelize.define(
	"Tag",
	{
		id_tag: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		tableName: "Tag",
		timestamps: false,
	}
);

module.exports = Tag;
