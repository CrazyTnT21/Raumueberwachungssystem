# Raumüberwachungssystem

## Webseite

### Lokaler Server

Für das lokale testen startet man den lokalen Server mit `node www/dev-server/dev-server.mjs`,
welcher dann unter http://localhost erreichbar ist.

### Nginx

Für das Projekt wird Nginx als Webserver verwendet.
Die Konfigurationsdatei befindet sich unter [nginx.conf](nginx.conf).

Die zurzeitige Konfiguration definiert eine Index route als eine index.html Datei oder
als eine Datei mit dem gleichen Verzeichnissnamen (bsp. http://localhost/hauptseite => /hauptseite/hauptseite.html)

Restliche Routen werden anhand des Dateinamens ohne die .html erweitung gefunden

## Server

Für das starten der Serverinstanz führt man

```bash 
npm --prefix server run start
```
aus, wonach der Server unter http://localhost:3000 erreichbar ist.

Zum installieren der Dependencies muss 
```bash 
cd server
npm install
```
ausgeführt werden.

## Coding Style

Außer Kommentaren wird nur Englisch verwendet.

Verzeichnisse & Dateien werden generell klein und in kebab-case (raum-auswertung.js) geschrieben.

