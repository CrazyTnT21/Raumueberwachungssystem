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

    app.get('/light', async (req, res) =>
        res.send(await lightController.getItems(req)))
}

function defineAirRoute(app: Express, client: Client)
{
    const airRepository: AirRepository = new DefaultAirRepository(client);
    const airService: AirService = new DefaultAirService(airRepository);
    const airController: AirController = new AirController(airService);

    app.get('/air', (req, res) => airController.handleRequests(req, res))
}

function defineTemperatureRoute(app: Express, client: Client)
{
    const temperatureRepository: TemperatureRepository = new DefaultTemperatureRepository(client);
    const temperatureService: TemperatureService = new DefaultTemperatureService(temperatureRepository);
    const temperatureController: TemperatureController = new TemperatureController(temperatureService);

    app.get('/Temperature', async (req, res) =>
        res.send(await temperatureController.getItems(req)))
}

function defineHumidityRoute(app: Express, client: Client)
{
    const humidityRepository: HumidityRepository = new DefaultHumidityRepository(client);
    const humidityService: HumidityService = new DefaultHumidityService(humidityRepository);
    const humidityController: HumidityController = new HumidityController(humidityService);

    app.get('/humidity', async (req, res) =>
        res.send(await humidityController.getItems(req)))
}