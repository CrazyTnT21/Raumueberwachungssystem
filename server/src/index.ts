import express, {Express, Request, Response} from 'express';
import {defineRoutes} from "./routes";

const app: Express = express()

const port: number = 3000;
defineRoutes(app);
app.listen(port, () => {
    console.log(`Server hört Anfragen auf Port ${port}`)
})

