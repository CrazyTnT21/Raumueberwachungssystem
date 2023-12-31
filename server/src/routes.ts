//Beispiel
import {Client} from "pg";
import {Express} from "express";
import {DefaultAirRepository} from "./repositories/default-air-repository";
import {DefaultAirService} from "./services/default-air-service";
import {DefaultLightRepository} from "./repositories/default-light-repository";
import {DefaultLightService} from "./services/default-light-service";
import {LightController} from "./controllers/light-controller";
import {LightService} from "./services/interfaces/light-service";
import {AirRepository} from "./repositories/interfaces/air-repository";
import {AirService} from "./services/interfaces/air-service";
import {AirController} from "./controllers/air-controller";
import {LightRepository} from "./repositories/interfaces/light-repository";
import {HumidityController} from "./controllers/humidity-controller";
import {DefaultHumidityService} from "./services/default-humidity-service";
import {DefaultHumidityRepository} from "./repositories/default-humidity-repository";
import {HumidityService} from "./services/interfaces/humidity-service";
import {HumidityRepository} from "./repositories/interfaces/humidity-repository";
import {TemperatureController} from "./controllers/temperature-controller";
import {DefaultTemperatureService} from "./services/default-temperature-service";
import {DefaultTemperatureRepository} from "./repositories/default-temperature-repository";
import {TemperatureRepository} from "./repositories/interfaces/temperature-repository";
import {TemperatureService} from "./services/interfaces/temperature-service";

class User
{
    Id: number;
    Name: string;

    constructor(id: number, name: string)
    {
        this.Id = id;
        this.Name = name;
    }
}

export function defineRoutes(app: Express, client: Client)
{
    defineLightRoute(app, client);
    defineAirRoute(app, client);
    defineTemperatureRoute(app, client);
    defineHumidityRoute(app, client);
}

function defineLightRoute(app: Express, client: Client)
{
    const lightRepository: LightRepository = new DefaultLightRepository(client);
    const lightService: LightService = new DefaultLightService(lightRepository);
    const lightController: LightController = new LightController(lightService);

    app.get('/Licht', (req, res) =>
        res.send(lightController.getItems(req)))
    app.post('/Licht', (req, res) =>
        res.send(lightController.createItem(req)))
}

function defineAirRoute(app: Express, client: Client)
{
    const airRepository: AirRepository = new DefaultAirRepository(client);
    const airService: AirService = new DefaultAirService(airRepository);
    const airController: AirController = new AirController(airService);

    app.get('/Luft', (req, res) =>
        res.send(airController.getItems(req)))
    app.post('/Luft', (req, res) =>
        res.send(airController.createItem(req)))
}

function defineTemperatureRoute(app: Express, client: Client)
{
    const temperatureRepository: TemperatureRepository = new DefaultTemperatureRepository(client);
    const temperatureService: TemperatureService = new DefaultTemperatureService(temperatureRepository);
    const temperatureController: TemperatureController = new TemperatureController(temperatureService);

    app.get('/Temperatur', (req, res) =>
        res.send(temperatureController.getItems(req)))
    app.post('/Temperatur', (req, res) =>
        res.send(temperatureController.createItem(req)))
}

function defineHumidityRoute(app: Express, client: Client)
{
    const humidityRepository: HumidityRepository = new DefaultHumidityRepository(client);
    const humidityService: HumidityService = new DefaultHumidityService(humidityRepository);
    const humidityController: HumidityController = new HumidityController(humidityService);

    app.get('/Feuchtigkeit', (req, res) =>
        res.send(humidityController.getItems(req)))
    app.post('/Feuchtigkeit', (req, res) =>
        res.send(humidityController.createItem(req)))
}