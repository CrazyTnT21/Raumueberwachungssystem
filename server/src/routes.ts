import {Express} from "express";
import {LightController} from "./controllers/light-controller";
import {LightService} from "./services/interfaces/light-service";
import {AirService} from "./services/interfaces/air-service";
import {AirController} from "./controllers/air-controller";
import {HumidityController} from "./controllers/humidity-controller";
import {HumidityService} from "./services/interfaces/humidity-service";
import {TemperatureController} from "./controllers/temperature-controller";
import {TemperatureService} from "./services/interfaces/temperature-service";

export type Services = {
    lightService: () => LightService,
    airService: () => AirService,
    temperatureService: () => TemperatureService,
    humidityService: () => HumidityService
}

export function defineRoutes(app: Express, services: Services)
{
    defineLightRoute(app, services.lightService);
    defineAirRoute(app, services.airService);
    defineTemperatureRoute(app, services.temperatureService);
    defineHumidityRoute(app, services.humidityService);
}

function defineLightRoute(app: Express, lightService: () => LightService)
{
    app.get('/light', async (req, res) =>
    {
        const lightController: LightController = new LightController(lightService());

        res.send(await lightController.getItems(req))
    })
}

function defineAirRoute(app: Express, airService: () => AirService)
{

    app.get('/air', (req, res) =>
    {
        const airController: AirController = new AirController(airService());

        airController.handleRequests(req, res)
    })
}

function defineTemperatureRoute(app: Express, temperatureService: () => TemperatureService)
{
    const temperatureController: TemperatureController = new TemperatureController(temperatureService());

    app.get('/temperature', async (req, res) =>
        res.send(await temperatureController.getItems(req)))
}

function defineHumidityRoute(app: Express, humidityService: () => HumidityService)
{
    const humidityController: HumidityController = new HumidityController(humidityService());

    app.get('/humidity', async (req, res) =>
        res.send(await humidityController.getItems(req)))
}