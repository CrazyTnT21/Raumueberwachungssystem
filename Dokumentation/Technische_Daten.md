## Datenbank <img alt="PostgreSql Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" width="25px">

Für Die Datenbank wird [PostgreSql](https://www.postgresql.org/) als Datenbanksystem verwendet.

## Hosting <img src="https://avatars.githubusercontent.com/u/1294177?s=280&v=4" width="25px">
Für das Hosting der Anwendungen wird ein Raspberry Pi 4 4GB Version 1.4 mit Arch Linux verwendet. 
Als Webserver wird Nginx verwendet.

## Backend
Das Backend wird in Typescript programmiert und verwendet folgende Dependencies:
- [express.js](https://www.npmjs.com/package/express): Behandeln von Anfragen
- [node-pg](https://www.npmjs.com/package/pg): Für die Kommonikation zur Datenbank
- [onoff](https://www.npmjs.com/package/onoff): Zum Auslesen der GPIO Pins
- [ads1115 \[TEMP\]](https://www.npmjs.com/package/ads1115): Zum verarbeiten der konvertierten Analogen Signale

## Frontend
Das Frontend wird mit HTML5 und JS entwickelt und verwendet folgende Dependencies:
- [chart.js](https://www.chartjs.org/): Für das darstellen von Diagrammen
- [Webpack](https://webpack.js.org/): Für das lokale testen und bundeln von node Modulen