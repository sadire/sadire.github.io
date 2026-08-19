@echo off
rem Vista previa local de la web. Requiere Python instalado.
rem Deja esta ventana abierta mientras miras la web; ciérrala para parar.
start "" http://localhost:8123
python -m http.server 8123
