import express, {Express, Request, Response} from 'express';
import { Lichtservice } from './Services/Lichtservice';
import { Luftservice } from './Services/Luftservice';
import { Feuchtigkeitservice } from './Services/Feuchtigkeitservice';
import { Temperaturservice } from './Services/Temperatur';
import { Client } from 'pg';
//Beispiel
class User {
    Id: number;
    Name: string;

    constructor(id: number, name: string) {
        this.Id = id;
        this.Name = name;
    }
}
export function defineRoutes(app: Express) {

    const firstUser = new User(1, "Peter"); //Beispiel
const client = new Client("IP.....");
    app.get('/', (req, res) => {
        res.send(firstUser)
    })
    app.post('/', (req, res) => {})
const LichtService: Lichtservice = new Lichtservice(client);

    app.get('/Licht', (req, res) => { res.send( LichtService.getItems()) })

    const LuftService: Luftservice = new Luftservice(client);

    app.get('/Luft', (req, res) => { res.send( LuftService.getItems()) })

    const FeuchtigkeitService: Feuchtigkeitservice = new Feuchtigkeitservice();

    app.get('/Feuchtigkeit', (req, res) => { res.send( FeuchtigkeitService.getItems()) })

    const TemperaturService: Temperaturservice = new Temperaturservice();

    app.get('/Temperatur', (req, res) => { res.send( TemperaturService.getItems()) })
}