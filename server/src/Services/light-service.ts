import {Client} from "pg";
import {Light} from "../classes/light";
import {Select} from "../db/select";

export class LightService
{
    private _client: Client;

    constructor(client: Client)
    {
        this._client = client;

    }

    async getItems()
    {
        //select "  " from TABELLE
        // select id, wert from Licht
        const select = await new Select<Light>("Licht")
            .column("id")
            .column("value")
            .list(this._client);
        return select;

    }

    updateItems(item: Light)
    {
        // "update licht set value = item.value where id = item.id"
        return item;
    }

    createItems(item: Light)
    {
        //    "insert into Licht("wert") values("item.wert")"
        return item;
    }

    deleteItems(ids: number[])
    {

    }
}