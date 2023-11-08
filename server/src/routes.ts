import express, {Express, Request, Response} from 'express';
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

    app.get('/', (req, res) => {
        res.send(firstUser)
    })
    app.post('/', (req, res) => {})
    app.put('/', (req, res) => {});
    app.delete('/', (req, res) => {});
}