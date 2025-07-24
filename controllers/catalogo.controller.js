const { Catalogo, Genero, Actor, Tag } = require("../database/models");
const { Op } = require("sequelize");

const obtenerCatalogo = async (req, res) => {
	try {
		const catalogo = await Catalogo.findAll({
			include: [Genero, Actor, Tag],
		});

		if (!catalogo.length) {
			return res.status(404).json({ error: "No se encontraron resultados" });
		}

		const resultado = catalogo.map((item) => {
			return {
				id: item.id_catalogo,
				poster: item.poster,
				titulo: item.titulo,
				resumen: item.resumen,
				temporadas: item.temporadas,
				duracion: item.duracion,
				trailer: item.trailer,
				categoria: item.categoria,
				genero: item.Genero.nombre,
				reparto: item.Actors.map((a) => `${a.nombre} ${a.apellido}`).join(", "),
				tags: item.Tags.map((t) => t.nombre).join(", "),
			};
		});

		res.json({
			cantidad: resultado.length,
			catalogo: resultado,
		});
	} catch (err) {
		res.status(500).json({ error: "Error al obtener el catálogo" });
	}
};

const obtenerPorTitulo = async (req, res) => {
	const { titulo } = req.params;

	if (!titulo) {
		return res.status(400).json({ error: "Título es requerido" });
	}

	try {
		const catalogo = await Catalogo.findAll({
			where: { titulo: { [Op.like]: `%${titulo.trim()}%` } },
			include: [Genero, Actor, Tag],
		});

		if (!catalogo.length) {
			return res.status(404).json({ error: "No se encontraron resultados" });
		}

		const resultado = catalogo.map((item) => {
			return {
				id: item.id_catalogo,
				poster: item.poster,
				titulo: item.titulo,
				resumen: item.resumen,
				temporadas: item.temporadas,
				duracion: item.duracion,
				trailer: item.trailer,
				categoria: item.categoria,
				genero: item.Genero.nombre,
				reparto: item.Actors.map((a) => `${a.nombre} ${a.apellido}`).join(", "),
				tags: item.Tags.map((t) => t.nombre).join(", "),
			};
		});

		res.json({
			cantidad: resultado.length,
			catalogo: resultado,
		});
	} catch (err) {
		res.status(500).json({ error: "Error al buscar por título" });
	}
};

const obtenerPorId = async (req, res) => {
	const { id } = req.params;

	if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
		return res.status(400).json({
			error: "El ID debe ser un número entero positivo",
		});
	}

	try {
		const catalogo = await Catalogo.findByPk(id, {
			include: [Genero, Actor, Tag],
		});
		if (!catalogo)
			return res.status(404).json({ error: "Elemento no encontrado" });

		res.json({
			id: catalogo.id_catalogo,
			poster: catalogo.poster,
			titulo: catalogo.titulo,
			resumen: catalogo.resumen,
			temporadas: catalogo.temporadas,
			duracion: catalogo.duracion,
			trailer: catalogo.trailer,
			categoria: catalogo.categoria,
			genero: catalogo.Genero.nombre,
			reparto: catalogo.Actors.map((a) => `${a.nombre} ${a.apellido}`).join(
				", "
			),
			tags: catalogo.Tags.map((t) => t.nombre).join(", "),
		});
	} catch (err) {
		res.status(500).json({ error: "Error al buscar por ID" });
	}
};

const obtenerPeliculas = async (req, res) => {
	try {
		const catalogo = await Catalogo.findAll({
			where: { categoria: "Película" },
			include: [Genero, Actor, Tag],
		});

		if (!catalogo.length) {
			return res.status(404).json({ error: "No se encontraron películas" });
		}

		const resultado = catalogo.map((item) => {
			return {
				id: item.id_catalogo,
				poster: item.poster,
				titulo: item.titulo,
				resumen: item.resumen,
				temporadas: item.temporadas,
				duracion: item.duracion,
				trailer: item.trailer,
				categoria: item.categoria,
				genero: item.Genero.nombre,
				reparto: item.Actors.map((a) => `${a.nombre} ${a.apellido}`).join(", "),
				tags: item.Tags.map((t) => t.nombre).join(", "),
			};
		});

		res.json({
			tipo: "Película",
			cantidad: resultado.length,
			catalogo: resultado,
		});
	} catch (err) {
		res.status(500).json({ error: "Error al obtener películas" });
	}
};

const obtenerSeries = async (req, res) => {
	try {
		const catalogo = await Catalogo.findAll({
			where: { categoria: "Serie" },
			include: [Genero, Actor, Tag],
		});

		if (!catalogo.length) {
			return res.status(404).json({ error: "No se encontraron series" });
		}

		const resultado = catalogo.map((item) => {
			return {
				id: item.id_catalogo,
				poster: item.poster,
				titulo: item.titulo,
				resumen: item.resumen,
				temporadas: item.temporadas,
				duracion: item.duracion,
				trailer: item.trailer,
				categoria: item.categoria,
				genero: item.Genero.nombre,
				reparto: item.Actors.map((a) => `${a.nombre} ${a.apellido}`).join(", "),
				tags: item.Tags.map((t) => t.nombre).join(", "),
			};
		});

		res.json({
			tipo: "Serie",
			cantidad: resultado.length,
			catalogo: resultado,
		});
	} catch (err) {
		res.status(500).json({ error: "Error al obtener series" });
	}
};

const altaContenido = async (req, res) => {
	const {
		poster,
		titulo,
		resumen,
		temporadas,
		duracion,
		trailer,
		categoria,
		genero_id,
		actores_id,
		tags_id,
	} = req.body;

	if (
		!titulo ||
		!categoria ||
		!genero_id ||
		actores_id === undefined ||
		tags_id === undefined
	) {
		return res.status(400).json({
			error:
				"Faltan datos requeridos: título, categoría, género_id, actores_id o tags_id",
		});
	}

	if (categoria !== "Película" && categoria !== "Serie") {
		return res.status(400).json({ error: "Categoría inválida" });
	}

	if (!Number.isInteger(Number(genero_id)) || Number(genero_id) <= 0) {
		return res
			.status(400)
			.json({ error: "El ID de género debe ser un número entero positivo" });
	}

	if (
		temporadas &&
		(!Number.isInteger(Number(temporadas)) || Number(temporadas) <= 0)
	) {
		return res
			.status(400)
			.json({ error: "El número de temporadas debe ser un entero positivo" });
	}

	if (
		categoria === "Serie" &&
		(!temporadas || !Number.isInteger(Number(temporadas)) || temporadas <= 0)
	) {
		return res.status(400).json({
			error:
				"Para series, el número de temporadas es requerido y debe ser un entero positivo",
		});
	}

	if (
		categoria === "Película" &&
		(!duracion || !/^\d+\sminutos$/.test(duracion))
	) {
		return res.status(400).json({
			error:
				'Para películas, la duración es requerida y debe seguir el formato: "número minutos", por ejemplo "120 minutos"',
		});
	}

	if (!Array.isArray(actores_id) || actores_id.length === 0) {
		return res
			.status(400)
			.json({ error: "actores_id debe ser un array no vacío" });
	}

	if (!Array.isArray(tags_id) || tags_id.length === 0) {
		return res
			.status(400)
			.json({ error: "tags_id debe ser un array no vacío" });
	}

	try {
		const genero = await Genero.findByPk(genero_id);

		if (!genero) {
			return res.status(400).json({ error: "ID de género no existe" });
		}

		const actoresExistentes = await Actor.count({
			where: { id_actor: actores_id },
		});
		if (actoresExistentes !== actores_id.length) {
			return res
				.status(400)
				.json({ error: "Uno o más IDs de actores no existen" });
		}

		const tagsExistentes = await Tag.count({
			where: { id_tag: tags_id },
		});
		if (tagsExistentes !== tags_id.length) {
			return res
				.status(400)
				.json({ error: "Uno o más IDs de tags no existen" });
		}

		const nuevoContenido = await Catalogo.create({
			poster: poster ? poster.trim().replace(/</g, "&lt;") : null,
			titulo: titulo.trim().replace(/</g, "&lt;"),
			resumen: resumen ? resumen.trim().replace(/</g, "&lt;") : null,
			temporadas: temporadas || null,
			duracion: duracion ? duracion.trim().replace(/</g, "&lt;") : null,
			trailer: trailer ? trailer.trim().replace(/</g, "&lt;") : null,
			categoria,
			genero_id,
		});

		await nuevoContenido.addActors(actores_id);
		await nuevoContenido.addTags(tags_id);

		const contenidoCompleto = await nuevoContenido.reload({
			include: [Genero, Actor, Tag],
		});

		res.status(201).json({
			id: contenidoCompleto.id_catalogo,
			poster: contenidoCompleto.poster,
			titulo: contenidoCompleto.titulo,
			resumen: contenidoCompleto.resumen,
			temporadas: contenidoCompleto.temporadas,
			duracion: contenidoCompleto.duracion,
			trailer: contenidoCompleto.trailer,
			categoria: contenidoCompleto.categoria,
			genero: contenidoCompleto.Genero.nombre,
			reparto: contenidoCompleto.Actors.map(
				(a) => `${a.nombre} ${a.apellido}`
			).join(", "),
			tags: contenidoCompleto.Tags.map((t) => t.nombre).join(", "),
		});
	} catch (err) {
		console.error("Error al crear contenido:", err);
		res.status(500).json({ error: "Error al crear contenido" });
	}
};

const editarContenido = async (req, res) => {
	const { id } = req.params;
	const {
		poster,
		titulo,
		resumen,
		temporadas,
		duracion,
		trailer,
		categoria,
		genero_id,
		actores_id,
		tags_id,
	} = req.body;

	if (
		!titulo ||
		!categoria ||
		!genero_id ||
		actores_id === undefined ||
		tags_id === undefined
	) {
		return res.status(400).json({
			error:
				"Faltan datos requeridos: título, categoría, género_id, actores_id o tags_id",
		});
	}

	if (categoria !== "Película" && categoria !== "Serie") {
		return res.status(400).json({ error: "Categoría inválida" });
	}

	if (!Number.isInteger(Number(genero_id)) || Number(genero_id) <= 0) {
		return res
			.status(400)
			.json({ error: "El ID de género debe ser un número entero positivo" });
	}

	if (
		temporadas &&
		(!Number.isInteger(Number(temporadas)) || Number(temporadas) <= 0)
	) {
		return res
			.status(400)
			.json({ error: "El número de temporadas debe ser un entero positivo" });
	}

	if (
		categoria === "Serie" &&
		(!temporadas || !Number.isInteger(Number(temporadas)) || temporadas <= 0)
	) {
		return res.status(400).json({
			error:
				"Para series, el número de temporadas es requerido y debe ser un entero positivo",
		});
	}

	if (
		categoria === "Película" &&
		(!duracion || !/^\d+\sminutos$/.test(duracion))
	) {
		return res.status(400).json({
			error:
				'Para películas, la duración es requerida y debe seguir el formato: "número minutos", por ejemplo "120 minutos"',
		});
	}

	if (!Array.isArray(actores_id) || actores_id.length === 0) {
		return res
			.status(400)
			.json({ error: "actores_id debe ser un array no vacío" });
	}

	if (!Array.isArray(tags_id) || tags_id.length === 0) {
		return res
			.status(400)
			.json({ error: "tags_id debe ser un array no vacío" });
	}

	try {
		const genero = await Genero.findByPk(genero_id);

		if (!genero) {
			return res.status(400).json({ error: "ID de género no existe" });
		}

		const contenido = await Catalogo.findByPk(id);

		if (!contenido) {
			return res.status(404).json({ error: "Contenido no encontrado" });
		}

		const actoresExistentes = await Actor.count({
			where: { id_actor: actores_id },
		});
		if (actoresExistentes !== actores_id.length) {
			return res
				.status(400)
				.json({ error: "Uno o más IDs de actores no existen" });
		}

		const tagsExistentes = await Tag.count({
			where: { id_tag: tags_id },
		});
		if (tagsExistentes !== tags_id.length) {
			return res
				.status(400)
				.json({ error: "Uno o más IDs de tags no existen" });
		}

		await contenido.update(
			{
				poster: poster ? poster.trim().replace(/</g, "&lt;") : null,
				titulo: titulo.trim().replace(/</g, "&lt;"),
				resumen: resumen ? resumen.trim().replace(/</g, "&lt;") : null,
				temporadas: temporadas || null,
				duracion: duracion ? duracion.trim().replace(/</g, "&lt;") : null,
				trailer: trailer ? trailer.trim().replace(/</g, "&lt;") : null,
				categoria,
				genero_id: genero_id,
			},
			{ where: { id_catalogo: id } }
		);

		await contenido.setTags(tags_id);
		await contenido.setActors(actores_id);

		const contenidoActualizado = await contenido.reload({
			include: [Genero, Actor, Tag],
		});

		res.status(200).json({
			id: contenidoActualizado.id_catalogo,
			poster: contenidoActualizado.poster,
			titulo: contenidoActualizado.titulo,
			resumen: contenidoActualizado.resumen,
			temporadas: contenidoActualizado.temporadas,
			duracion: contenidoActualizado.duracion,
			trailer: contenidoActualizado.trailer,
			categoria: contenidoActualizado.categoria,
			genero: contenidoActualizado.Genero.nombre,
			reparto: contenidoActualizado.Actors.map(
				(a) => `${a.nombre} ${a.apellido}`
			).join(", "),
			tags: contenidoActualizado.Tags.map((t) => t.nombre).join(", "),
		});
	} catch (err) {
		console.error("Error al editar contenido:", err);
		res.status(500).json({ error: "Error al editar contenido" });
	}
};

const eliminarContenido = async (req, res) => {
	const { id } = req.params;

	if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
		return res.status(400).json({
			error: "El ID debe ser un número entero positivo",
		});
	}

	try {
		const contenido = await Catalogo.findByPk(id);
		if (!contenido) {
			return res.status(404).json({ error: "Contenido no encontrado" });
		}

		await Catalogo.destroy({ where: { id_catalogo: id } });
		res.json({ message: "Contenido eliminado correctamente" });
	} catch (err) {
		console.error("Error al eliminar contenido:", err);
		res.status(500).json({ error: "Error al eliminar contenido" });
	}
};

module.exports = {
	obtenerCatalogo,
	obtenerPorTitulo,
	obtenerPorId,
	obtenerPeliculas,
	obtenerSeries,
	altaContenido,
	editarContenido,
	eliminarContenido,
};
