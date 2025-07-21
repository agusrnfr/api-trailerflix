// Importar express y router para el manejo de rutas
const express = require("express");
const router = express.Router();

// Importar los controladores de las películas
const {
	obtenerPeliculas,
	obtenerPorTitulo,
	obtenerPorCodigo,
	obtenerPorGenero,
} = require("../controllers/catalogo.controller");

// Endpoint: Ruta raíz
// Muestra un mensaje de bienvenida a la API
router.get("/", (req, res) => {
	res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bienvenidas a trailerflix-api</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; text-align: center; padding: 50px; }
        h1 { color: #e50914; }
      </style>
    </head>
    <body>
      <h1>🎬Catálogo de películas</h1>
      <h2>Ingenias: Pre-entrega 3</h2>
    </body>
    </html>
  `);
});

router.get("/peliculas", obtenerPeliculas);

// Buscar por nombre
router.get("/peliculas/nombre/:nombre", obtenerPorTitulo);

// Buscar por código
router.get("/peliculas/codigo/:codigo", obtenerPorCodigo);

// Buscar por género
router.get("/peliculas/genero/:genero", obtenerPorGenero);

// Exportar las rutas
module.exports = router;
