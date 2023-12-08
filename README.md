# Raumüberwachungssystem

## Webseite

### Lokaler Server

Für das lokale testen startet man den lokalen Server mit `npm --prefix www run start`
Danach ist der lokale Server unter http://localhost erreichbar.

Zum installieren der Dependencies muss man in das [www](www) Verzeichnis navigieren und `npm install` ausführen.

### Nginx

Für das Projekt wird Nginx als Webserver verwendet. Die Konfigurationsdatei befindet sich unter [nginx.conf](nginx.conf).

Die zurzeitige Konfiguration definiert eine Index route als eine index.html Datei oder
als eine Datei mit dem gleichen Verzeichnissnamen (bsp. http://localhost/hauptseite => /hauptseite/hauptseite.html)

Restliche Routen werden anhand des Dateinamens ohne die .html erweitung gefunden

## Server

Für das starten der Serverinstanz führt man `npm --prefix server run start` aus,
wonach der Server unter http://localhost:3000 erreichbar ist.

Zum installieren der Dependencies muss man in das [server](server) Verzeichnis navigieren und `npm install` ausführen.

## Coding Style

Außer Kommentaren wird nur Englisch verwendet.

Verzeichnisse & Dateien werden generell klein und in kebab-case (raum-auswertung.js) geschrieben.

