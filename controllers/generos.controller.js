const { Genero } = require("../database/models");

const obtenerTodosLosGeneros = async (req, res) => {
	try {
		const generos = await Genero.findAll();
		if (!generos.length) {
			return res.status(404).json({ error: "No se encontraron géneros" });
		}
		res.json(generos);
	} catch (err) {
		res.status(500).json({ error: "Error al obtener géneros" });
	}
};

module.exports = {
	obtenerTodosLosGeneros,
};
