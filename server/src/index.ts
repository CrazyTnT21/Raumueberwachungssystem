import express, {Express} from 'express';
import {defineRoutes} from "./routes";
import {Client} from "pg";
import cors from 'cors';

export const SERVER_URL: string = "localhost:3000";
try
{
    const args = getArgs();

    if (args.has("-help"))
        printHelp();
    else
        run(parseConfig(args));
}
catch (e: Error | any)
{
    console.error(e.message ?? e)
}

async function run(config: ServerConfig)
{
    const dbClient: Client = new Client({
        host: config.dbConnection.host,
        port: 5432,
        database: 'roomsurveillancesystem',
        user: 'server',
        password: config.dbConnection.password,
    });
    try
    {
        await validateDatabase(dbClient)
    }
    catch (e)
    {
        process.exitCode = 1;
        console.error(e)
        return;
    }
    console.log(`Verbindung zur Datenbank erfolgreich hergestellt!`);

    if (config.allowRead)
        setInterval(() => retrieveData(dbClient), 5000);

    if (!config.allowApi)
        return;

    const app: Express = express();

    app.use(cors())
    defineRoutes(app, dbClient);
    app.listen(config.port, () => console.log(`Server hört Anfragen auf Port ${config.port}`));
}

function parseConfig(args: Map<string, any>): ServerConfig
{
    if (args.get("--no-read") && args.get("--no-api"))
        throw new Error("--no-api & --no-read, Prozess wird abgebrochen!. Diese Kombination macht keinen sinn. Der Server sollte eine Schnittstelle anbieten oder Daten auslesen.")

    if (!args.has("-password"))
        throw new Error("Es wurde kein Password für den Datenbank Nutzer angegeben! 'npm run start -- -help' für mehr Informationen");

    //Die originalen Argumente sollen nicht mutiert werden
    const argsCopy: Map<string, any> = new Map(args);

    if (argsCopy.has("--port"))
    {
        const port = Number(argsCopy.get("--port"));
        if (isNaN(port) || !Number.isInteger(port))
            throw new Error(`Der eingegebene Wert '${argsCopy.get("--port")}' für '--port' ist keine valide Zahl`);
        argsCopy.set("--port", port);
    }
    else
    {
        argsCopy.set("--port", 3000);
    }

    if (!argsCopy.has("--db"))
        argsCopy.set("--db", "localhost");

    return {
        dbConnection: {host: argsCopy.get("--db"), password: argsCopy.get("-password")},
        port: argsCopy.get("--port"),
        allowApi: !argsCopy.get("--no-api"),
        allowRead: !argsCopy.get("--no-read")
    }
}

function retrieveData(dbClient: Client)
{
    //TODO: Add services
}

async function validateDatabase(dbClient: Client)
{
    await dbClient.connect().catch((e) => reject("Beim Verbinden zur Datenbank ist ein Fehler aufgetreten", e));
    try
    {
        const tables = ["room", "temperature", "humidity", "light", "air"];
        for (const table of tables)
        {
            await dbClient
                .query("select * from " + table)
                .catch((e) => reject(tableError(table), e));
        }
    }
    finally
    {
        await dbClient.end();
    }
}

function tableError(table: string)
{
    return `Die Abfrage für die Tabelle '${table}' hat einen Fehler geschmissen`
}

function reject(message: string, error: Error)
{
    console.error(error);
    throw new Error(message);
}

type ServerConfig = {
    dbConnection: { host: string, password: string },
    port: number,
    allowApi: boolean,
    allowRead: boolean
}

function getArgs(): Map<string, any>
{
    const args: Map<string, string | boolean> = new Map();

    for (let i = 0; i < process.argv.length; i++)
    {
        if (!process.argv[i].startsWith("-"))
        {
            continue;
        }
        if (i + 1 >= process.argv.length || process.argv[i + 1].startsWith("-"))
        {
            args.set(process.argv[i], true);
        }
        else
        {
            args.set(process.argv[i], process.argv[i + 1]);
            i++;
        }

    }
    return args;
}

function printHelp()
{
    //language=bash
    console.log(`
   npm run start -- -help                 Zeigt diese Hilfe an
        
   npm run build                          Kompiliert das Typescript in Javascript in das /dist Verzeichnis
   npm run start -- [<Argumente>]         Führt npm run build aus und startet das Programm
   
   Argumente:
        (Benötigt)
             -password <Wert>             Das Passwort für den Datenbank Nutzer
        (Optional)
             --port <Wert>                Die Adresse, die für die Datenbank verwendet werden soll. Verwendet 'localhost' als Rückfallwert
             --db <Wert>                  Der Port, der für die Schnittstelle verwendet werden soll. Verwendet '3000' als Rückfallwert
             --no-api                     Der Server liefert keine api schnittstelle und sendet nur Daten an die Datenbank
             --no-read                    Der Server liest keine Daten aus
    `);
}