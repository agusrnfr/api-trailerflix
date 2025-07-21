require("dotenv").config(); // Leer las variables del .env

const express = require("express");
const app = express();
const routes = require("./routes/catalogo.routes.js");
const sequelize = require("./database/db.js"); // Importar la conexión a la base de datos

// Usar la variable del .env o usar 3000 por defecto
const PUERTO = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Importar y usar las rutas del catalogo
app.use("/", routes);

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
