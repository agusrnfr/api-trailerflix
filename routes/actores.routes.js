const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/actores.controller");

router.get("/", obtenerTodosLosActores);
router.get("/nombre/:nombre", obtenerActorPorNombre);
router.get("/nombre-completo", obtenerActorPorNombreCompleto);
router.get("/id/:id", obtenerActorPorId);
router.post("/alta", altaActor);
router.put("/editar/:id", editarActor);
router.delete("/eliminar/:id", eliminarActor);
router.get("/id/:id/catalogo", obtenerCatalogoPorActor);
router.get("/id/:id/catalogo/titulo/:titulo", obtenerCatalogoPorActorYTitulo);
router.get("/id/:id/catalogo/tipo/serie", obtenerCatalogoPorActorYTipoSerie);
router.get(
	"/id/:id/catalogo/tipo/pelicula",
	obtenerCatalogoPorActorYTipoPelicula
);

module.exports = router;
