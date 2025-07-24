import json
import re

# Cargar JSON
with open("trailerflix.json", encoding="utf-8") as f:
    data = json.load(f)

# Estructuras auxiliares
generos = {}
tags = {}
actores = {}
genero_id = 1
tag_id = 1
actor_id = 1
insert_lines = []


def dividir_nombre(nombre_completo):
    partes = nombre_completo.strip().split()
    return partes[0], " ".join(partes[1:]) if len(partes) > 1 else ""


# INSERTS PARA Genero
for item in data:
    nombre = item["genero"].strip()
    if nombre.lower() not in (g.lower() for g in generos):
        generos[nombre] = genero_id
        insert_lines.append(
            f'INSERT INTO Genero (id_genero, nombre) VALUES ({genero_id}, "{nombre}");')
        genero_id += 1

# INSERTS PARA Tag
for item in data:
    for tag in map(str.strip, item["tags"].split(",")):
        tag_key = tag.lower()
        if tag_key not in tags:
            tags[tag_key] = tag_id
            insert_lines.append(
                f'INSERT INTO Tag (id_tag, nombre) VALUES ({tag_id}, "{tag}");')
            tag_id += 1

# INSERTS PARA Actor
for item in data:
    for actor in map(str.strip, item["reparto"].split(",")):
        nombre, apellido = dividir_nombre(actor)
        key = (nombre.lower(), apellido.lower())
        if key not in actores:
            actores[key] = actor_id
            insert_lines.append(
                f'INSERT INTO Actor (id_actor, nombre, apellido) '
                f'VALUES ({actor_id}, "{nombre}", "{apellido}");')
            actor_id += 1

# INSERTS PARA Catalogo
for item in data:
    id_catalogo = item["id"]
    poster = item["poster"].replace('"', r'\"')
    titulo = item["titulo"].replace('"', r'\"')
    resumen = item.get("resumen", "").replace('"', r'\"')
    trailer = item["trailer"].replace('"', r'\"')
    genero_id = generos[item["genero"]]
    categoria = item["categoria"]

    # Temporadas (solo si es serie)
    temp = item.get("temporadas", "NULL")
    if isinstance(temp, str) and not temp.isdigit():
        temporadas = "NULL"
    else:
        temporadas = re.sub(r"[^\d]", "", str(temp)) or "NULL"

    # Duración (solo si es película)
    dur = item.get("duracion", "").strip()
    if dur and dur.lower() != "n/a":
        dur = dur.replace('"', "'")
        duracion = f'"{dur}"'
    else:
        duracion = "NULL"

    insert_lines.append(
        f'INSERT INTO Catalogo (id_catalogo, poster, titulo, resumen, temporadas, duracion, trailer, genero_id, categoria) '
        f'VALUES ({id_catalogo}, "{poster}", "{titulo}", "{resumen}", {temporadas}, {duracion}, "{trailer}", {genero_id}, "{categoria}");'
    )

# INSERTS PARA Catalogo_Tag
for item in data:
    id_catalogo = item["id"]
    for tag in map(str.strip, item["tags"].split(",")):
        tag_key = tag.lower()
        if tag_key in tags:
            insert_lines.append(
                f'INSERT INTO Catalogo_Tag (id_catalogo, id_tag) VALUES ({id_catalogo}, {tags[tag_key]});'
            )
        else:
            print(f"⚠️ Tag no encontrado: {tag}")

# INSERTS PARA Catalogo_Actor
for item in data:
    id_catalogo = item["id"]
    for actor in map(str.strip, item["reparto"].split(",")):
        nombre, apellido = dividir_nombre(actor)
        key = (nombre.lower(), apellido.lower())
        if key in actores:
            insert_lines.append(
                f"INSERT INTO Catalogo_Actor (id_catalogo, id_actor) VALUES ({id_catalogo}, {actores[key]});"
            )
        else:
            print(f"⚠️ Actor no encontrado: {nombre} {apellido}")

# Guardar en archivo .sql
with open("trailerflix_inserts.sql", "w", encoding="utf-8") as f:
    f.write("-- Script generado automáticamente\n")
    f.write("USE trailerflix;\n\n")
    for line in insert_lines:
        f.write(line + "\n")

print("✔ Script SQL generado: trailerflix_inserts.sql")
