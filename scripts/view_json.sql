USE trailerflix;

CREATE OR REPLACE VIEW vista_trailerflix AS
SELECT 
	c.id_catalogo,
	c.titulo,
	c.resumen,
	c.poster,
	c.temporadas,
	c.duracion,
	c.trailer,
	c.categoria,
	g.nombre AS genero,
	reparto.reparto,
	tags.tags
FROM catalogo c
JOIN genero g ON c.genero_id = g.id_genero
LEFT JOIN (
	SELECT 
		ca.id_catalogo,
		group_concat(DISTINCT CONCAT(a.nombre, ' ', a.apellido) SEPARATOR ', ') AS reparto
	FROM catalogo_actor ca
	JOIN actor a ON ca.id_actor = a.id_actor
	GROUP BY ca.id_catalogo
	) AS reparto ON c.id_catalogo = reparto.id_catalogo
LEFT JOIN (
	SELECT 
		ct.id_catalogo,
		group_concat(DISTINCT t.nombre SEPARATOR ', ') AS tags
	FROM catalogo_tag ct
	JOIN tag t ON ct.id_tag = t.id_tag
	GROUP BY ct.id_catalogo
	) AS tags ON c.id_catalogo = tags.id_catalogo
ORDER BY
	c.id_catalogo;
