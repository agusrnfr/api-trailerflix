# 🎬 Trailerflix API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js) ![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-active-brightgreen) ![PRs](https://img.shields.io/badge/PRs-welcome-orange)


**Trailerflix** es una API REST desarrollada con **Node.js** y **Express** que permite explorar un catálogo de películas y series a través de múltiples rutas organizadas.

## 🚀 Características

- 📚 Listado completo del catálogo.
- 🔍 Búsqueda por título.
- 🎭 Filtrado por películas o series.
- 👥 Búsqueda por actor/actriz en el reparto.
- 🎞 Acceso al trailer a tráves del ID.

- Obtener una lista de películas por género (por ejemplo: "Acción", "Terror", "Suspenso"). /generos/acción
- Obtener películas con los tags /tags/accion tags/suspenso
- 

## 📖 Estructura de los Datos

De cada película o serie se contiene la siguiente información:
- **id**: Identificador único de la película o serie.
- **poster**: Enlace a la imagen del poster de la película o serie.
- **titulo**: Título de la película o serie.
- **categoria**: Si se trata de una película o serie.
- **tags**: Palabras clave asociadas a la película o serie.
- **resumen**: Breve descripción de la película o serie.
- **temporadas**: Número de temporadas (si es una serie).
- **duracion**: Duración de la película o serie (si es una película).
- **reparto**: Actores/actrices que participan en la película o serie.
- **trailer**: Enlace al trailer de la película o serie (si está disponible).

## 📦 Instalación

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/Chinapaoletti/trailerflix-api
   cd trailerflix-api
   ```
2. Instalá las dependencias:
    ```bash
    npm install
    ```2.1. Si aún no lo hiciste, instalá express y nodemon:
      npm install express
      npm install --save-dev nodemon

3. Ejecutá el servidor:
   * En modo desarrollo (con nodemon):
        ```bash
        npm run dev
        ```
   * En modo producción:
        ```bash
        npm start
        ```
4. Accedé a la API a través de un navegador o herramienta de pruebas en la siguiente URL:
   ```bash
   http://localhost:3008/
   ```

## 🔧 Endpoints

| Método | Endpoint           | Descripción                                                                                                                                    |
|--------|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `GET`  | `/`                | Mensaje de bienvenida.                                                                                                                         |
| `GET`  | `/catalogo`        | Devuelve el catálogo completo con información de películas y series.                                                                          |
| `GET`  | `/titulo/:title`   | Retorna películas o series que coinciden con la cadena indicada en el título (filtrado por título).                                           |
| `GET`  | `/categoria/:cat`  | Retorna todos los ítems de la categoría solicitada ("pelicula" o "serie").                                                                   |
| `GET`  | `/reparto/:act`    | Devuelve películas o series que incluyen al actor o actriz indicado. Respuesta con título y reparto.                                          |
| `GET`  | `/trailer/:id`     | Devuelve el trailer (si existe) de la película/serie indicada por ID, junto con su título e ID.                                               |

---

## ➕ Endpoints adicionales

| Método | Endpoint      | Descripción                                                                         |
|--------|---------------|-------------------------------------------------------------------------------------|
| `GET`  | `/peliculas`  | Devuelve únicamente la lista de películas.                                         |
| `GET`  | `/series`     | Devuelve únicamente la lista de series.                                            |



### 📐 Normalización y Tercera Forma Normal (3FN)

El modelo de datos de **TrailerFlix** fue diseñado respetando los principios de normalización hasta la **Tercera Forma Normal (3FN)**, lo cual garantiza integridad, eficiencia y evita redundancias innecesarias.

Las características que lo demuestran son:

- ✅ Todos los campos son **atómicos** (1FN): no existen columnas que contengan múltiples valores en una sola celda.
- ✅ Cada campo **no clave depende completamente de la clave primaria** de su tabla (2FN).
- ✅ No hay **dependencias transitivas** entre campos no clave (3FN).

#### Ejemplos de diseño normalizado:

- La relación entre `Catalogo` y `Genero` se gestiona mediante una clave foránea (`genero`), evitando repetir nombres de género en cada fila.
- Las relaciones **muchos a muchos** (N:M), como las de `Catalogo` con `Tag` o `Actor`, se manejan mediante **tablas intermedias** (`Catalogo_Tag` y `Catalogo_Actor`), lo que evita duplicación de datos y facilita modificaciones.
- El campo `categoria` utiliza un tipo `ENUM` para asegurar consistencia entre valores posibles (`Pelicula` o `Serie`), sin necesidad de una tabla adicional.

Este diseño permite escalar la base de datos manteniendo la coherencia y facilita futuras consultas y mantenimientos.



## 👥 Desarrolladoras

- **Agostina Paoletti** - [agostinapaoletti](https://github.com/Chinapaoletti) 
- **Agustina Rojas** - [agusrnfr](https://github.com/agusrnfr)
- **Karina Chilque** - [karinachilque]()
