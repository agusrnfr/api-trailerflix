const { Tag } = require("../database/models");

const obtenerTodosLosTags = async (req, res) => {
	try {
		const tags = await Tag.findAll();

		if (!tags.length) {
			return res.status(404).json({ error: "No se encontraron tags" });
		}

		res.json(tags);
	} catch (error) {
		console.error("Error al obtener todos los tags:", error);
		res.status(500).json({ error: "Error al obtener todos los tags" });
	}
};

module.exports = {
	obtenerTodosLosTags,
};
