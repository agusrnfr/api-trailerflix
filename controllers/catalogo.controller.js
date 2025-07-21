const { Catalogo, Genero, Actor, Tag } = require("../database/models");
const { Op } = require("sequelize");

const obtenerCatalogo = async (req, res) => {
	try {
		const catalogo = await Catalogo.findAll({
			include: [Genero, Actor, Tag],
		});
		res.json(catalogo);
	} catch (err) {
		res.status(500).json({ error: "Error al obtener el catálogo" });
	}
};

const obtenerPorTitulo = async (req, res) => {
	const { titulo } = req.params;
	try {
		const resultado = await Catalogo.findAll({
			where: { titulo: { [Op.like]: `%${titulo}%` } },
			include: [Genero, Actor, Tag],
		});
		res.json(resultado);
	} catch (err) {
		res.status(500).json({ error: "Error al buscar por título" });
	}
};

const obtenerPorId = async (req, res) => {
	const { id } = req.params;
	try {
		const item = await Catalogo.findByPk(id, {
			include: [Genero, Actor, Tag],
		});
		if (!item) return res.status(404).json({ error: "No encontrado" });
		res.json(item);
	} catch (err) {
		res.status(500).json({ error: "Error al buscar por ID" });
	}
};

const obtenerPeliculas = async (req, res) => {
	try {
		const peliculas = await Catalogo.findAll({
			where: { categoria: "Pelicula" },
			include: [Genero, Actor, Tag],
		});
		res.json(peliculas);
	} catch (err) {
		res.status(500).json({ error: "Error al obtener películas" });
	}
};

const obtenerSeries = async (req, res) => {
	try {
		const series = await Catalogo.findAll({
			where: { categoria: "Serie" },
			include: [Genero, Actor, Tag],
		});
		res.json(series);
	} catch (err) {
		res.status(500).json({ error: "Error al obtener series" });
	}
};

module.exports = {
	obtenerCatalogo,
	obtenerPorTitulo,
	obtenerPorId,
	obtenerPeliculas,
	obtenerSeries,
};
