const express = require("express");
const router = express.Router();

const { obtenerTodosLosTags } = require("../controllers/tags.controller");

router.get("/", obtenerTodosLosTags);

module.exports = router;
