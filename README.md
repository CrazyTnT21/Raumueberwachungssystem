# Raumüberwachungssystem

## Webseite

### Lokaler Server

Für das lokale testen startet man den lokalen Server mit `npm --prefix www run start`
Danach ist der lokale Server unter http://localhost erreichbar.

Zum Installieren der Dependencies muss man in das [www](www) Verzeichnis navigieren und `npm install` ausführen.

### Nginx

Für das Projekt wird Nginx als Webserver verwendet. Die Konfigurationsdatei befindet sich unter [nginx.conf](nginx.conf).

Die derzeitige Konfiguration definiert eine Index-route als eine index.html Datei oder
als eine Datei mit dem gleichen Verzeichnisnamen (bsp. http://localhost/hauptseite → /hauptseite/hauptseite.html)

Restliche Routen werden anhand des Dateinamens ohne die .html Erweiterung gefunden

## Server

Für das Starten der Serverinstanz führt man `npm --prefix server run start -- -password {Password}` aus,
wonach der Server unter http://localhost:3000 erreichbar ist.

Zum Installieren der Dependencies muss man in das [server](server) Verzeichnis navigieren und `npm install` ausführen.

## Coding Style

Außer Kommentaren wird nur Englisch verwendet.

Verzeichnisse & Dateien werden generell klein und in kebab-case (raum-auswertung.js) geschrieben.

