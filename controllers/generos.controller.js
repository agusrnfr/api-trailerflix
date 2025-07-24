const { Genero, Catalogo } = require("../database/models");
const { Op } = require("sequelize");

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

const obtenerCatalogoPorGenero = async (req, res) => {
	const { nombre } = req.params;
	if (!nombre) {
		return res.status(400).json({ error: "El nombre del género es requerido" });
	}
	try {
		const catalogo = await Catalogo.findAll({
			include: [
				{
					model: Genero,
					where: {
						nombre: {
							[Op.like]: `%${nombre.trim()}%`,
						},
					},
					attributes: ["nombre"],
				},
			],
		});

		if (!catalogo.length) {
			return res
				.status(404)
				.json({ error: "No se encontraron resultados para ese género" });
		}

		const resultado = catalogo.map((item) => ({
			id: item.id_catalogo,
			poster: item.poster,
			titulo: item.titulo,
			resumen: item.resumen,
			temporadas: item.temporadas,
			duracion: item.duracion,
			trailer: item.trailer,
			categoria: item.categoria,
			genero: item.Genero.nombre,
		}));

		res.json({
			genero: nombre,
			cantidad: resultado.length,
			resultado,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Error al buscar el catálogo por género" });
	}
};

const obtenerPeliculasPorGenero = async (req, res) => {
	const { nombre } = req.params;

	if (!nombre) {
		return res.status(400).json({ error: "El nombre del género es requerido" });
	}

	try {
		const peliculas = await Catalogo.findAll({
			where: {
				categoria: "Película",
			},
			include: [
				{
					model: Genero,
					where: {
						nombre: {
							[Op.like]: `%${nombre.trim()}%`,
						},
					},
					attributes: ["nombre"],
				},
			],
		});

		if (!peliculas.length) {
			return res
				.status(404)
				.json({ error: "No se encontraron películas con ese género" });
		}

		const resultado = peliculas.map((item) => ({
			id: item.id_catalogo,
			poster: item.poster,
			titulo: item.titulo,
			resumen: item.resumen,
			temporadas: item.temporadas,
			duracion: item.duracion,
			trailer: item.trailer,
			categoria: item.categoria,
			genero: item.Genero.nombre,
		}));

		res.json({
			genero: nombre,
			categoria: "Película",
			cantidad: resultado.length,
			resultado,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Error al buscar las películas por género" });
	}
};

const obtenerSeriesPorGenero = async (req, res) => {
	const { nombre } = req.params;

	if (!nombre) {
		return res.status(400).json({ error: "El nombre del género es requerido" });
	}

	try {
		const series = await Catalogo.findAll({
			where: {
				categoria: "Serie",
			},
			include: [
				{
					model: Genero,
					where: {
						nombre: {
							[Op.like]: `%${nombre.trim()}%`,
						},
					},
					attributes: ["nombre"],
				},
			],
		});

		if (!series.length) {
			return res
				.status(404)
				.json({ error: "No se encontraron series con ese género" });
		}

		const resultado = series.map((item) => ({
			id: item.id_catalogo,
			poster: item.poster,
			titulo: item.titulo,
			resumen: item.resumen,
			temporadas: item.temporadas,
			duracion: item.duracion,
			trailer: item.trailer,
			categoria: item.categoria,
			genero: item.Genero.nombre,
		}));

		res.json({
			genero: nombre,
			categoria: "Serie",
			cantidad: resultado.length,
			resultado,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Error al buscar las series por género" });
	}
};

module.exports = {
	obtenerTodosLosGeneros,
	obtenerPeliculasPorGenero,
	obtenerSeriesPorGenero,
	obtenerCatalogoPorGenero,
};
