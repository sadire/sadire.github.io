
import os
import json

TEMPLATE_PATH = "plantilla_proyecto.html"
OUTPUT_DIR = "."
ENCODING = "utf-8"

def render_media(media):
    if media["tipo"] == "imagen":
        return f'<img src="{media["src"]}" alt="" />'
    elif media["tipo"] == "video":
        return f'<video controls src="{media["src"]}" style="width:100%;border-radius:8px;"></video>'
    return ""

def render_subsecciones(subsecciones):
    html = ""
    for bloque in subsecciones:
        if bloque["tipo"] == "texto-media":
            html += (
                '<div class="section text-video">'
                '<div class="text"><p>{}</p></div>'
                '<div class="visual">{}</div>'
                '</div>'.format(bloque["texto"], render_media(bloque["media"]))
            )
        elif bloque["tipo"] == "solo-video":
            html += (
                '<div class="section media-block">'
                '<div class="visual" style="flex:1 1 100%;text-align:center;">'
                '{}'
                '</div>'
                '</div>'.format(render_media(bloque["media"]))
            )
    return html

def generar_html_desde_json(json_path):
    with open(json_path, "r", encoding=ENCODING) as f:
        data = json.load(f)

    with open(TEMPLATE_PATH, "r", encoding=ENCODING) as f:
        template = f.read()

    html = template        .replace("{{titulo}}", data["titulo"])        .replace("{{media_principal}}", render_media(data["media_principal"]))        .replace("{{descripcion_principal}}", data["descripcion_principal"])        .replace("{{descripcion_galeria}}", data["descripcion_galeria"])        .replace("{{imagenes_galeria}}", "\n".join([f'<img src="{img}" alt="" />' for img in data["imagenes_galeria"]]))        .replace("{{subsecciones}}", render_subsecciones(data["subsecciones"]))

    base = os.path.splitext(os.path.basename(json_path))[0]
    output_file = os.path.join(OUTPUT_DIR, base + ".html")
    with open(output_file, "w", encoding=ENCODING) as f:
        f.write(html)
    print(f"✅ Generado: {output_file}")

if __name__ == "__main__":
    for file in os.listdir():
        if file.endswith(".json"):
            try:
                generar_html_desde_json(file)
            except Exception as e:
                print(f"❌ Error procesando {file}: {e}")
