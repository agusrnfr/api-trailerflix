const { Catalogo, Actor, Genero, Tag } = require("../database/models");
const { Op } = require("sequelize");

const obtenerTodosLosActores = async (req, res) => {
	try {
		const actores = await Actor.findAll();

		if (!actores.length) {
			return res.status(404).json({ error: "No se encontraron actores" });
		}

		res.json(actores);
	} catch (error) {
		console.error("Error al obtener todos los actores:", error);
		res.status(500).json({ error: "Error al obtener todos los actores" });
	}
};

const obtenerActorPorNombre = async (req, res) => {
	const { nombre } = req.params;

	if (!nombre) {
		return res.status(400).json({ error: "Nombre es requerido" });
	}

	try {
		const actores = await Actor.findAll({
			where: {
				nombre: {
					[Op.like]: `%${nombre.trim()}%`,
				},
			},
		});

		if (!actores.length) {
			return res.status(404).json({ error: "Actor no encontrado" });
		}

		res.json(actores);
	} catch (error) {
		console.error("Error al obtener actor por nombre:", error);
		res.status(500).json({ error: "Error al obtener actor por nombre" });
	}
};

const obtenerActorPorNombreCompleto = async (req, res) => {
	const { nombre, apellido } = req.query;

	if (!nombre || !apellido) {
		return res.status(400).json({ error: "Nombre y apellido son requeridos" });
	}

	try {
		const actor = await Actor.findAll({
			where: {
				nombre: nombre.trim(),
				apellido: apellido.trim(),
			},
		});

		if (!actor.length) {
			return res.status(404).json({ error: "Actor no encontrado" });
		}

		res.json(actor);
	} catch (error) {
		console.error("Error al obtener actor por nombre completo:", error);
		res
			.status(500)
			.json({ error: "Error al obtener actor por nombre completo" });
	}
};

const obtenerActorPorId = async (req, res) => {
	const { id } = req.params;

	if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
		return res.status(400).json({
			error: "El ID debe ser un número entero positivo",
		});
	}

	try {
		const actor = await Actor.findByPk(id);

		if (!actor) return res.status(404).json({ error: "Actor no encontrado" });

		res.json(actor);
	} catch (error) {
		console.error("Error al obtener actor por ID:", error);
		res.status(500).json({ error: "Error al obtener actor por ID" });
	}
};

const altaActor = async (req, res) => {
	const { nombre, apellido } = req.body;

	if (!nombre || !apellido) {
		return res.status(400).json({ error: "Nombre y apellido son requeridos" });
	}

	try {
		const nuevoActor = await Actor.create({
			nombre: nombre.trim().replace(/</g, "&lt;"),
			apellido: apellido.trim().replace(/</g, "&lt;"),
		});
		res.status(201).json(nuevoActor);
	} catch (error) {
		console.error("Error al crear actor:", error);
		res.status(500).json({ error: "Error al crear actor" });
	}
};

const editarActor = async (req, res) => {
	const { id } = req.params;
	const { nombre, apellido } = req.body;

	if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
		return res.status(400).json({
			error: "El ID debe ser un número entero positivo",
		});
	}

	if (!nombre || !apellido) {
		return res.status(400).json({ error: "Nombre y apellido son requeridos" });
	}

	try {
		const actor = await Actor.findByPk(id);

		if (!actor) return res.status(404).json({ error: "Actor no encontrado" });

		await actor.update({
			nombre: nombre.trim().replace(/</g, "&lt;"),
			apellido: apellido.trim().replace(/</g, "&lt;"),
		});

		res.json(actor);
	} catch (error) {
		console.error("Error al editar actor:", error);
		res.status(500).json({ error: "Error al editar actor" });
	}
};

const eliminarActor = async (req, res) => {
	const { id } = req.params;

	if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
		return res.status(400).json({
			error: "El ID debe ser un número entero positivo",
		});
	}

	try {
		const actor = await Actor.findByPk(id);

		if (!actor) return res.status(404).json({ error: "Actor no encontrado" });

		await actor.destroy();
		res.json({ message: "Actor eliminado" });
	} catch (error) {
		console.error("Error al eliminar actor:", error);
		res.status(500).json({ error: "Error al eliminar actor" });
	}
};

const obtenerCatalogoPorActor = async (req, res) => {
	const { id } = req.params;

	if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
		return res.status(400).json({
			error: "El ID debe ser un número entero positivo",
		});
	}

	try {
		const actor = await Actor.findByPk(id);
		if (!actor) {
			return res.status(404).json({ error: "Actor no encontrado" });
		}

		const catalogo = await Catalogo.findAll({
			include: [
				{
					model: Actor,
					where: { id_actor: id },
					through: { attributes: [] },
				},
				{
					model: Genero,
				},
				{
					model: Tag,
					through: { attributes: [] },
				},
			],
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
				tags: item.Tags.map((t) => t.nombre).join(", "),
			};
		});

		res.json({
			actor: {
				id: actor.id_actor,
				nombre: actor.nombre,
				apellido: actor.apellido,
			},
			cantidad: resultado.length,
			catalogo: resultado,
		});
	} catch (error) {
		console.error("Error al obtener catálogo por actor:", error);
		res.status(500).json({ error: "Error al obtener catálogo por actor" });
	}
};

const obtenerCatalogoPorActorYTitulo = async (req, res) => {
	const { id, titulo } = req.params;

	if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
		return res.status(400).json({
			error: "El ID debe ser un número entero positivo",
		});
	}

	try {
		const actor = await Actor.findByPk(id);
		if (!actor) {
			return res.status(404).json({ error: "Actor no encontrado" });
		}

		const catalogo = await Catalogo.findAll({
			where: { titulo: { [Op.like]: `%${titulo}%` } },
			include: [
				{
					model: Actor,
					where: { id_actor: id },
					through: { attributes: [] },
				},
				{
					model: Genero,
				},
				{
					model: Tag,
					through: { attributes: [] },
				},
			],
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
				tags: item.Tags.map((t) => t.nombre).join(", "),
			};
		});

		res.json({
			actor: {
				id: actor.id_actor,
				nombre: actor.nombre,
				apellido: actor.apellido,
			},
			cantidad: resultado.length,
			catalogo: resultado,
		});
	} catch (error) {
		console.error("Error al obtener catálogo por actor y título:", error);
		res
			.status(500)
			.json({ error: "Error al obtener catálogo por actor y título" });
	}
};

const obtenerCatalogoPorActorYTipoSerie = async (req, res) => {
	const { id } = req.params;

	if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
		return res.status(400).json({
			error: "El ID debe ser un número entero positivo",
		});
	}

	try {
		const actor = await Actor.findByPk(id);
		if (!actor) {
			return res.status(404).json({ error: "Actor no encontrado" });
		}

		const catalogo = await Catalogo.findAll({
			where: { categoria: "Serie" },
			include: [
				{
					model: Actor,
					where: { id_actor: id },
					through: { attributes: [] },
				},
				{
					model: Genero,
				},
				{
					model: Tag,
					through: { attributes: [] },
				},
			],
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
				tags: item.Tags.map((t) => t.nombre).join(", "),
			};
		});

		res.json({
			actor: {
				id: actor.id_actor,
				nombre: actor.nombre,
				apellido: actor.apellido,
			},
			cantidad: resultado.length,
			catalogo: resultado,
		});
	} catch (error) {
		console.error("Error al obtener catálogo por actor y tipo serie:", error);
		res
			.status(500)
			.json({ error: "Error al obtener catálogo por actor y tipo serie" });
	}
};

const obtenerCatalogoPorActorYTipoPelicula = async (req, res) => {
	const { id } = req.params;

	if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
		return res.status(400).json({
			error: "El ID debe ser un número entero positivo",
		});
	}

	try {
		const actor = await Actor.findByPk(id);
		if (!actor) {
			return res.status(404).json({ error: "Actor no encontrado" });
		}

		const catalogo = await Catalogo.findAll({
			where: { categoria: "Película" },
			include: [
				{
					model: Actor,
					where: { id_actor: id },
					through: { attributes: [] },
				},
				{
					model: Genero,
				},
				{
					model: Tag,
					through: { attributes: [] },
				},
			],
		});

		if (!catalogo.length) {
			return res.status(404).json({ error: "No se encontraron peliculas" });
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
				tags: item.Tags.map((t) => t.nombre).join(", "),
			};
		});

		res.json({
			actor: {
				id: actor.id_actor,
				nombre: actor.nombre,
				apellido: actor.apellido,
			},
			cantidad: resultado.length,
			catalogo: resultado,
		});
	} catch (error) {
		console.error(
			"Error al obtener catálogo por actor y tipo película:",
			error
		);
		res
			.status(500)
			.json({ error: "Error al obtener catálogo por actor y tipo película" });
	}
};

module.exports = {
	obtenerTodosLosActores,
	obtenerActorPorNombre,
	obtenerActorPorNombreCompleto,
	obtenerActorPorId,
	altaActor,
	editarActor,
	eliminarActor,
	obtenerCatalogoPorActor,
	obtenerCatalogoPorActorYTitulo,
	obtenerCatalogoPorActorYTipoSerie,
	obtenerCatalogoPorActorYTipoPelicula,
};
