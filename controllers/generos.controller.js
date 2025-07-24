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

const obtenerPelisPorGenero = async (req, res) => {
	const { nombre } = req.params;

	if (!nombre) {
		return res.status(400).json({ error: "El nombre del género es requerido" });
	}

	try {
		const peliculas = await Catalogo.findAll({
			include: [
				{
					model: Genero,
					where: {
						nombre: {
							[Op.like]: `%${nombre.trim()}%`,
						},
					},
					attributes: ['nombre'],
				},
			],
		});

		if (!peliculas.length) {
			return res.status(404).json({ error: "No se encontraron películas con ese género" });
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
			cantidad: resultado.length,
			resultado,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Error al buscar las películas por género" });
	}
};


module.exports = {
	obtenerTodosLosGeneros,
	obtenerPelisPorGenero
};
