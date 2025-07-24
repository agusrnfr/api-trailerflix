const express = require("express");
const router = express.Router();

const { 
    obtenerTodosLosGeneros,
	obtenerPelisPorGenero 
} = require("../controllers/generos.controller");

router.get("/", obtenerTodosLosGeneros);
router.get("/pelis/:nombre", obtenerPelisPorGenero );

module.exports = router;
