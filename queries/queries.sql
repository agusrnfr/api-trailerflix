USE trailerflix;
-- Punto 1
-- Obtener una lista de películas por género (por ejemplo: "Acción", "Terror", "Suspenso").
SELECT c.id_catalogo, c.titulo, g.nombre
FROM catalogo c
JOIN genero g ON c.genero = g.id_genero
WHERE 
	g.nombre IN ('Acción', 'Terror', 'Suspenso', 'Crimen')
ORDER BY
	c.id_catalogo;
    
-- Punto 2
-- Obtener películas con los tags "Aventura" y "Ciencia Ficción", o "Aventura" y "Fantasía".
SELECT c.id_catalogo, c.titulo
FROM catalogo c
JOIN catalogo_tag ct ON c.id_catalogo = ct.id_catalogo
JOIN tag t ON ct.id_tag = t.id_tag
WHERE t.nombre IN ('Aventura', 'Ciencia Ficción', 'Fantasía')
GROUP BY c.id_catalogo, c.titulo
HAVING 
    SUM(t.nombre = 'Aventura') > 0 AND
    (
        SUM(t.nombre = 'Ciencia Ficción') > 0 OR
        SUM(t.nombre = 'Fantasía') > 0
    );
    
-- Punto 3
-- Visualizar títulos y categorías cuyo resumen contenga la palabra "misión".
SELECT 
	c.titulo,
    c.categoria
FROM catalogo c
WHERE c.resumen LIKE '%misión%'
ORDER BY
	c.id_catalogo;
    
-- Punto 4
-- Listar las series con al menos 3 temporadas.

-- Obtenes todos los campos como en el JSON
SELECT 
	c.id_catalogo,
	c.titulo,
	c.resumen,
	c.poster,
	c.temporadas,
	c.trailer,
	c.categoria,
	g.nombre AS genero,
	reparto.reparto,
	tags.tags
FROM catalogo c
JOIN genero g ON c.genero = g.id_genero
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