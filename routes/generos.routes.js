const express = require("express");
const router = express.Router();

const {
	obtenerTodosLosGeneros,
	obtenerCatalogoPorGenero,
	obtenerPeliculasPorGenero,
	obtenerSeriesPorGenero,
} = require("../controllers/generos.controller");

router.get("/", obtenerTodosLosGeneros);
router.get("/:nombre", obtenerCatalogoPorGenero);
router.get("/tipo/pelicula/:nombre", obtenerPeliculasPorGenero);
router.get("/tipo/serie/:nombre", obtenerSeriesPorGenero);

module.exports = router;
