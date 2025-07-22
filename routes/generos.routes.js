const express = require("express");
const router = express.Router();

const { obtenerTodosLosGeneros } = require("../controllers/generos.controller");

router.get("/", obtenerTodosLosGeneros);

module.exports = router;
