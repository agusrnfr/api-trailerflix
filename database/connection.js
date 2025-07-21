const sequelize = require("./db.js");

const authenticate = async () => {
	try {
		await sequelize.authenticate();
		console.log("Conexión a la base de datos establecida correctamente.");
	} catch (error) {
		console.error("No se pudo conectar a la base de datos:", error);
	}
};

const closeConnection = async () => {
	try {
		await sequelize.close();
		console.log("Conexión a la base de datos cerrada correctamente.");
	} catch (error) {
		console.error("Error al cerrar la conexión a la base de datos:", error);
	}
};

module.exports = {
	authenticate,
	closeConnection,
};
