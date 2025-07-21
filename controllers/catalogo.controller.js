const {
	Catalogo,
	Genero,
	Actor,
	Tag,
	Catalogo_Tag,
	Catalogo_Actor,
} = require("../database/models");

const { authenticate, closeConnection } = require("../database/connection.js");

const obtenerPeliculas = async (req, res) => {
	try {
		const peliculas = await Catalogo.findAll({
			where: { categoria: "Pelicula" },
			include: [Genero, Tag, Actor],
		});

		res.json(peliculas);
	} catch (error) {
		res.status(500).json({ error: "Error al obtener películas" });
	}
};

const obtenerPorTitulo = async (req, res) => {
	const { nombre } = req.params;
	try {
		const resultados = await Catalogo.findAll({
			where: {
				titulo: { [require("sequelize").Op.like]: `%${nombre}%` },
			},
			include: [Genero, Tag, Actor],
		});
		res.json(resultados);
	} catch (error) {
		res.status(500).json({ error: "Error al buscar por título" });
	}
};

const obtenerPorCodigo = async (req, res) => {
	const { codigo } = req.params;
	try {
		const item = await Catalogo.findByPk(codigo, {
			include: [Genero, Tag, Actor],
		});
		if (!item) return res.status(404).json({ mensaje: "No encontrado" });
		res.json(item);
	} catch (error) {
		res.status(500).json({ error: "Error al buscar por ID" });
	}
};

const obtenerPorGenero = async (req, res) => {
	const { genero } = req.params;
	try {
		const resultados = await Catalogo.findAll({
			where: { genero },
			include: [Genero, Tag, Actor],
		});
		if (resultados.length === 0)
			return res.status(404).json({ mensaje: "No encontrado" });
		res.json(resultados);
	} catch (error) {
		res.status(500).json({ error: "Error al buscar por género" });
	}
};

module.exports = {
	obtenerPeliculas,
	obtenerPorTitulo,
	obtenerPorCodigo,
	obtenerPorGenero,
};
