const express = require("express");
const router = express.Router();
const {
	obtenerCatalogo,
	obtenerPorTitulo,
	obtenerPorId,
	obtenerPeliculas,
	obtenerSeries,
} = require("../controllers/catalogo.controller");

router.get("/", obtenerCatalogo);
router.get("/titulo/:titulo", obtenerPorTitulo);
router.get("/:id", obtenerPorId);
router.get("/tipo/pelicula", obtenerPeliculas);
router.get("/tipo/serie", obtenerSeries);

module.exports = router;
