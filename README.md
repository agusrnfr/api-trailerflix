# 🎬 Trailerflix API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js) ![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-active-brightgreen) ![PRs](https://img.shields.io/badge/PRs-welcome-orange)


**Trailerflix** es una API REST desarrollada con **Node.js** y **Express** que permite explorar un catálogo de películas y series a través de múltiples rutas organizadas.

## 🚀 Características

- 📚 **Catálogo completo**  
  Accedé al listado de todas las películas y series disponibles en Trailerflix.

- 🔠 **Búsqueda por título**  
  Encontrá películas o series buscando por título parcial o completo.

- 🆔 **Consulta por ID**  
  Obtené los detalles de una película o serie específica a partir de su ID.

- 🎬 **Filtrado por tipo de contenido**  
  Separá el catálogo por tipo: películas o series.

- 🎭 **Gestión de actores**  
  Consultá el listado completo de actores, buscá por nombre o apellido, y conocé en qué contenidos actúan.

- 🎞 **Acceso a trailers oficiales**  
  Visualizá el trailer de una película o serie usando su ID único (disponible en la vista SQL).

- 🛠 **Administración de contenido**  
  Agregá, editá o eliminá películas, series o actores desde endpoints protegidos para gestión del catálogo.

- 🔍 **Vista SQL unificada**  
  Mostrá todos los datos combinados desde una vista SQL que respeta el modelo JSON del proyecto.


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
   git clone https://github.com/agusrnfr/api-trailerflix.git
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
   http://localhost:3006/
   ```

# 📘 Documentación de Endpoints - Trailerflix API

## 🎬 Catálogo

| Método | Endpoint                   | Descripción                 | Parámetros       | Restricciones y Validaciones                                                                                                                                                                                          |
| ------ | -------------------------- | --------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/catalogo`                | Obtener todo el catálogo    | -                | Devuelve 404 si está vacío                                                                                                                                                                                            |
| GET    | `/catalogo/titulo/:titulo` | Buscar contenido por título | `:titulo`        | Requiere valor, match parcial (LIKE `%titulo%`)                                                                                                                                                                       |
| GET    | `/catalogo/:id`            | Obtener contenido por ID    | `:id`            | `id` debe ser entero positivo, 404 si no existe                                                                                                                                                                       |
| GET    | `/catalogo/tipo/pelicula`  | Listar todas las películas  | -                | 404 si no hay                                                                                                                                                                                                         |
| GET    | `/catalogo/tipo/serie`     | Listar todas las series     | -                | 404 si no hay                                                                                                                                                                                                         |
| POST   | `/catalogo/alta`           | Crear nuevo contenido       | JSON body        | - `titulo`, `categoria`, `genero_id` obligatorios<br>- `categoria` debe ser `"Película"` o `"Serie"`<br>- `actores_id` y `tags_id`: arrays no vacíos<br>- Si es `"Serie"`, `temporadas` obligatorio y entero positivo |
| PUT    | `/catalogo/editar/:id`     | Editar contenido existente  | `:id`, JSON body | Igual a las validaciones del POST + verificación de existencia                                                                                                                                                        |
| DELETE | `/catalogo/eliminar/:id`   | Eliminar contenido por ID   | `:id`            | `id` válido, verifica existencia antes de borrar                                                                                                                                                                      |

---

## 🎭 Actores

| Método | Endpoint                                         | Descripción                            | Parámetros                  | Restricciones y Validaciones                   |
| ------ | ------------------------------------------------ | -------------------------------------- | --------------------------- | ---------------------------------------------- |
| GET    | `/actores`                                       | Obtener todos los actores              | -                           | 404 si no hay actores                          |
| GET    | `/actores/nombre/:nombre`                        | Buscar actores por nombre              | `:nombre`                   | Requiere valor, match parcial                  |
| GET    | `/actores/nombre-completo?nombre=..&apellido=..` | Buscar actor por nombre y apellido     | Query: `nombre`, `apellido` | Ambos obligatorios                             |
| GET    | `/actores/id/:id`                                | Obtener actor por ID                   | `:id`                       | `id` entero positivo, 404 si no existe         |
| POST   | `/actores/alta`                                  | Crear nuevo actor                      | JSON body                   | `nombre` y `apellido` requeridos               |
| PUT    | `/actores/editar/:id`                            | Editar actor                           | `:id`, JSON body            | Igual a POST + validación de existencia        |
| DELETE | `/actores/eliminar/:id`                          | Eliminar actor por ID                  | `:id`                       | `id` válido, verifica existencia               |
| GET    | `/actores/id/:id/catalogo`                       | Obtener catálogo en que actúa un actor | `:id`                       | 404 si el actor no existe o no tiene contenido |
| GET    | `/actores/id/:id/catalogo/titulo/:titulo`        | Obtener contenido por actor y título   | `:id`, `:titulo`            | 404 si no hay resultados                       |
| GET    | `/actores/id/:id/catalogo/tipo/serie`            | Obtener series en las que actúa        | `:id`                       | Filtro por `categoria: "Serie"`                |
| GET    | `/actores/id/:id/catalogo/tipo/pelicula`         | Obtener películas en las que actúa     | `:id`                       | Filtro por `categoria: "Película"`             |

---

## 🔍 Vista SQL

| Método | Endpoint            | Descripción                          | Parámetros | Restricciones            |
| ------ | ------------------- | ------------------------------------ | ---------- | ------------------------ |
| GET    | `/trailerflix/view` | Muestra el contenido de la vista SQL | -          | 404 si no hay resultados |

---

## 📌 Notas

* 
* 
* 

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
