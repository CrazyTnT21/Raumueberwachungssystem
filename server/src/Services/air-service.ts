import {Client} from "pg";
import {Air} from "../classes/air";
import {Select} from "../db/select";

export class AirService
{
    private _client: Client;

    constructor(client: Client)
    {
        this._client = client;

    }

    async getItems()
    {
        //select "  " from TABELLE
        // select id, wert from Luft
        const select = await new Select<Air>("Luft")
            .column("id")
            .column("value")
            .list(this._client);
        return select;
    }

    updateItems(item: Air): Air
    {

        return item;
    }

    createItems(item: Air): Air
    {
        //    "insert into Luft("wert") values("item.wert")"
        return item;
    }

    deleteItems(ID: number[])
    {

    }
}