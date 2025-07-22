const express = require("express");
const router = express.Router();
const {
	obtenerCatalogo,
	obtenerPorTitulo,
	obtenerPorId,
	obtenerPeliculas,
	obtenerSeries,
	altaContenido,
	editarContenido,
	eliminarContenido,
} = require("../controllers/catalogo.controller");

router.get("/", obtenerCatalogo);
router.get("/titulo/:titulo", obtenerPorTitulo);
router.get("/:id", obtenerPorId);
router.get("/tipo/pelicula", obtenerPeliculas);
router.get("/tipo/serie", obtenerSeries);
router.post("/alta", altaContenido);
router.put("/editar/:id", editarContenido);
router.delete("/eliminar/:id", eliminarContenido);

module.exports = router;
