import {Express} from 'express';
import {Client} from 'pg';
import {LightService} from "./services/light-service";
import {AirService} from "./services/air-service";
import {HumidityService} from "./services/humidity-service";
import {TemperatureService} from "./services/temperature-service";

//Beispiel
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

export function defineRoutes(app: Express,client: Client)
{
    const firstUser = new User(1, "Peter"); //Beispiel

    app.get('/', (req, res) =>
    {
        res.send(firstUser)
    })
    app.post('/', (req, res) =>
    {
    })
    const LichtService: LightService = new LightService(client);

    app.get('/Licht', (req, res) =>
    {
        res.send(LichtService.getItems())
    })

    const LuftService: AirService = new AirService(client);

    app.get('/Luft', (req, res) =>
    {
        res.send(LuftService.getItems())
    })

    const FeuchtigkeitService: HumidityService = new HumidityService();

    app.get('/Feuchtigkeit', (req, res) =>
    {
        res.send(FeuchtigkeitService.getItems())
    })

    const TemperaturService: TemperatureService = new TemperatureService();

    app.get('/Temperatur', (req, res) =>
    {
        res.send(TemperaturService.getItems())
    })
}