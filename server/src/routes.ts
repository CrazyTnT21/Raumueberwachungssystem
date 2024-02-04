import {Express} from "express";
import {LightController} from "./controllers/light-controller";
import {LightService} from "./services/interfaces/light-service";
import {AirService} from "./services/interfaces/air-service";
import {AirController} from "./controllers/air-controller";
import {HumidityController} from "./controllers/humidity-controller";
import {HumidityService} from "./services/interfaces/humidity-service";
import {TemperatureController} from "./controllers/temperature-controller";
import {TemperatureService} from "./services/interfaces/temperature-service";
import {Endpoint, Link} from "./endpoint";
import {SERVER_URL} from "./index";
import {RoomService} from "./services/interfaces/room-service";
import {RoomController} from "./controllers/room-controller";

export type Services = {
    lightService: () => LightService,
    airService: () => AirService,
    temperatureService: () => TemperatureService,
    humidityService: () => HumidityService,
    roomService: () => RoomService
}

export function defineRoutes(app: Express, services: Services)
{
    defineLightRoute(app, services.lightService);
    defineAirRoute(app, services.airService);
    defineTemperatureRoute(app, services.temperatureService);
    defineHumidityRoute(app, services.humidityService);
    defineRoomRoute(app, services.roomService);
}

function transformEndpoint<T>(routePath: string, item: T): Endpoint<T>
{
    const links: Link[] = [new Link(SERVER_URL, SERVER_URL + routePath,)]
    const count = item ? 1 : 0;
    return new Endpoint(item, count, links, count);
}

function transformEndpointItems<T>(routePath: string, total: number, items: T[], page: number): Endpoint<T[]>
{
    const previous = page == 0 ? null : (SERVER_URL + routePath + "?page=" + (page - 1));
    const next = total <= (page * maxLimit + items.length) ? null : SERVER_URL + routePath + "?page=" + (page + 1);
    const links: Link[] = [new Link(SERVER_URL, SERVER_URL + routePath, previous, next)]

    return new Endpoint(items, items.length, links, total);
}

function send400(res: any, message: string)
{
    res.statusMessage = message;
    res.status(400).end();
    res.send();
}

function defineLightRoute(app: Express, lightService: () => LightService)
{
    app.get("/light/:room", async (req, res) =>
    {
        const lightController: LightController = new LightController(lightService());
        const room = req.params.room;
        const page = getPage(<string>req.query.page);
        const limit = getLimit(<string>req.query.limit)
        if (req.query.latest == "")
        {
            const result = await lightController.getLatestItem(room);
            const endPoint = transformEndpoint(req.path, result);
            res.json(endPoint);
        }
        else
        {
            const result = await lightController.getItems(room, page, limit);
            const endPoint = transformEndpointItems(req.path, result.total, result.items, page);
            res.json(endPoint);
        }
    })
    app.get("/light/:room/:from-:to", async (req, res) =>
    {
        if (!req.params.from ||
            !Number.isInteger(Number(req.params.from)))
        {
            send400(res, "Invalid date for 'from'")
            return;
        }

        const room = req.params.room;
        const from = new Date(Number(req.params.from));
        const to = Number.isInteger(Number(req.params.to)) ? new Date(Number(req.params.to)) : new Date();
        const page = getPage(<string>req.query.page);
        const limit = getLimit(<string>req.query.limit);

        const lightController: LightController = new LightController(lightService());

        const result = await lightController.getItemsByTimespan(room, from, to, page, limit);
        const endPoint = transformEndpointItems(req.path, result.total, result.items, page);
        res.json(endPoint);
    })
}

function sendError(res: any, e: { code: number, error: Error } | any)
{
    console.error(e);
    res.statusMessage = e.code ? e.error?.message : null;
    res.status(e.code ?? 500).end();
    res.send();
}

function defineAirRoute(app: Express, airService: () => AirService)
{
    app.get("/air/:room", async (req, res) =>
    {
        const airController: AirController = new AirController(airService());
        const room = req.params.room;
        const page = getPage(<string>req.query.page);
        const limit = getLimit(<string>req.query.limit)
        if (req.query.latest == "")
        {
            const result = await airController.getLatestItem(room);
            const endPoint = transformEndpoint(req.path, result);
            res.json(endPoint);
        }
        else
        {
            const result = await airController.getItems(room, page, limit);
            const endPoint = transformEndpointItems(req.path, result.total, result.items, page);
            res.json(endPoint);
        }
    })
    app.get("/air/:room/:from-:to", async (req, res) =>
    {
        if (!req.params.from ||
            !Number.isInteger(Number(req.params.from)))
        {
            send400(res, "Invalid date for 'from'")
            return;
        }

        const room = req.params.room;
        const from = new Date(Number(req.params.from));
        const to = Number.isInteger(Number(req.params.to)) ? new Date(Number(req.params.to)) : new Date();
        const page = getPage(<string>req.query.page);
        const limit = getLimit(<string>req.query.limit);

        const airController: AirController = new AirController(airService());

        const result = await airController.getItemsByTimespan(room, from, to, page, limit);
        const endPoint = transformEndpointItems(req.path, result.total, result.items, page);
        res.json(endPoint);
    })
}

function defineTemperatureRoute(app: Express, temperatureService: () => TemperatureService)
{
    app.get("/temperature/:room", async (req, res) =>
    {
        const temperatureController: TemperatureController = new TemperatureController(temperatureService());
        const room = req.params.room;
        const page = getPage(<string>req.query.page);
        const limit = getLimit(<string>req.query.limit)

        if (req.query.latest == "")
        {
            const result = await temperatureController.getLatestItem(room);
            const endPoint = transformEndpoint(req.path, result);
            res.json(endPoint);
        }
        else
        {
            const result = await temperatureController.getItems(room, page, limit);
            const endPoint = transformEndpointItems(req.path, result.total, result.items, page);
            res.json(endPoint);
        }
    })
    app.get("/temperature/:room/:from-:to", async (req, res) =>
    {
        if (!req.params.from ||
            !Number.isInteger(Number(req.params.from)))
        {
            send400(res, "Invalid date for 'from'")
            return;
        }

        const room = req.params.room;
        const from = new Date(Number(req.params.from));
        const to = Number.isInteger(Number(req.params.to)) ? new Date(Number(req.params.to)) : new Date();
        const page = getPage(<string>req.query.page);
        const limit = getLimit(<string>req.query.limit);

        const temperatureController: TemperatureController = new TemperatureController(temperatureService());

        const result = await temperatureController.getItemsByTimespan(room, from, to, page, limit);
        const endPoint = transformEndpointItems(req.path, result.total, result.items, page);
        res.json(endPoint);
    })
}

function defineHumidityRoute(app: Express, humidityService: () => HumidityService)
{
    app.get("/humidity/:room", async (req, res) =>
    {
        const humidityController: HumidityController = new HumidityController(humidityService());
        const room = req.params.room;
        const page = getPage(<string>req.query.page);
        const limit = getLimit(<string>req.query.limit)

        if (req.query.latest == "")
        {
            const result = await humidityController.getLatestItem(room);
            const endPoint = transformEndpoint(req.path, result);
            res.json(endPoint);
        }
        else
        {
            const result = await humidityController.getItems(room, page, limit);
            const endPoint = transformEndpointItems(req.path, result.total, result.items, page);
            res.json(endPoint);
        }
    })
    app.get("/humidity/:room/:from-:to", async (req, res) =>
    {
        if (!req.params.from ||
            !Number.isInteger(Number(req.params.from)))
        {
            send400(res, "Invalid date for 'from'")
            return;
        }

        const room = req.params.room;
        const from = new Date(Number(req.params.from));
        const to = Number.isInteger(Number(req.params.to)) ? new Date(Number(req.params.to)) : new Date();
        const page = getPage(<string>req.query.page);
        const limit = getLimit(<string>req.query.limit);

        const humidityController: HumidityController = new HumidityController(humidityService());

        const result = await humidityController.getItemsByTimespan(room, from, to, page, limit);
        const endPoint = transformEndpointItems(req.path, result.total, result.items, page);
        res.json(endPoint);
    })
}

function defineRoomRoute(app: Express, roomService: () => RoomService)
{
    app.get("/room", async (req, res) =>
    {
        const roomController = new RoomController(roomService());
        const search = <string>req.query.search;
        const page = getPage(<string>req.query.page);
        const limit = getLimit(<string>req.query.limit)

        const result = await roomController.getItems(search, page, limit);
        const endPoint = transformEndpointItems(req.path, result.total, result.items, page);
        res.json(endPoint);

    })
    app.get("/room/:id(\d+)", async (req, res) =>
    {
        let id = Number(req.params.id);
        if (id <= 0)
        {
            send400(res, "Invalid date for 'from'")
            return;
        }

        const roomController: RoomController = new RoomController(roomService());

        const result = await roomController.getItem(id);
        const endPoint = transformEndpoint(req.path, result);
        res.json(endPoint);
    })
}

export function getPage(page: number | string | undefined | null)
{
    if (!page)
        return 0;

    page = Number(page);
    if (!Number.isInteger(page))
    {
        return 0;
    }

    if (page < 50000 && page >= 0)
        return Number(page);

    return 0;
}

export function getLimit(value: number | string | undefined | null)
{
    if (!value)
        return maxLimit;

    value = Number(value);
    if (!Number.isInteger(value))
    {
        return maxLimit;
    }
    if (value < maxLimit && value >= 0)
        return <number>value;
    return maxLimit;
}

export const maxLimit = 500;