USE trailerflix;
-- Punto 1
-- Obtener una lista de películas por género (por ejemplo: "Acción", "Terror", "Suspenso").
SELECT c.id_catalogo, c.titulo, g.nombre
FROM catalogo c
JOIN genero g ON c.genero_id = g.id_genero
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