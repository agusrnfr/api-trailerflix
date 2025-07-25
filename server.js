require("dotenv").config(); // Leer las variables del .env

const express = require("express");
const app = express();
const catalogoRoutes = require("./routes/catalogo.routes.js"); // Importar las rutas de películas
const actoresRoutes = require("./routes/actores.routes.js"); // Importar las rutas de actores
const generosRoutes = require("./routes/generos.routes.js"); // Importar las rutas de géneros
const tagsRoutes = require("./routes/tags.routes.js"); // Importar las rutas de tags
const sequelize = require("./database/db.js"); // Importar la conexión a la base de datos

// Usar la variable del .env o usar 3000 por defecto
const PUERTO = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Endpoint: Ruta raíz
// Muestra un mensaje de bienvenida a la API
app.get("/", (req, res) => {
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

// Endpoint: Integracion con vista SQL
// Muestra el catálogo de películas desde la vista SQL
// Utiliza una consulta SQL para obtener los datos de la vista 'vista_trailerflix'
app.get("/trailerflix/view", async (req, res) => {
	try {
		const [catalogo] = await sequelize.query("SELECT * FROM vista_trailerflix");

		if (!catalogo.length) {
			return res.status(404).json({ error: "No se encontraron resultados" });
		}

		res.json(catalogo);
	} catch (err) {
		res.status(500).json({ error: "Error al obtener el catálogo" });
	}
});

// Importar y usar las rutas de películas
app.use("/catalogo", catalogoRoutes);
app.use("/actores", actoresRoutes);
app.use("/generos", generosRoutes);
app.use("/tags", tagsRoutes);

// Middleware para manejar errores 404
app.use((req, res) => {
	res.status(404).send("¡Multiplícate por cero! Esta ruta no existe. 😕");
});

// Conectar a la base de datos antes de iniciar el servidor
sequelize
	.authenticate()
	.then(() => {
		console.log("Conexión a la base de datos establecida correctamente.");

		app.listen(PUERTO, () => {
			console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
		});
	})
	.catch((err) => {
		console.error("No se pudo conectar a la base de datos:", err);
	});

process.on("SIGINT", async () => {
	console.log("\nCerrando conexión a la base de datos...");
	await sequelize.close();
	console.log("Conexión cerrada. Saliendo...");
	process.exit(0);
});
