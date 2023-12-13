import { Client } from "pg";
import { Licht } from "../classes/Licht";
import { Select } from "../db/select";

export class Lichtservice {

    private _client: Client;
    constructor(client: Client){
        this._client = client;
        
    }
    async getItems (){
        //select "  " from TABELLE
        // select id, wert from Licht
        const select = await new Select<Licht>("Licht")
        .column("id")
        .column("wert")
        .list(this._client);
    return select;

    }
    updateItems (item: Licht){
        "update licht set wert = item.wert where id = item.id"
        return item;
    }
    createItems (item: Licht){
    //    "insert into Licht("wert") values("item.wert")"
        return item;
    }
    deleteItems (ID: number[]){

    }
}