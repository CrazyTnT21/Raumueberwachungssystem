import { Client } from "pg";
import { Luft} from "../classes/Luft";
import { Select } from "../db/select";

export class Luftservice {

    private _client: Client;
    constructor(client: Client){
        this._client = client;
        
    }
    async getItems (){
        //select "  " from TABELLE
        // select id, wert from Luft
        const select = await new Select<Luft>("Luft")
        .column("id")
        .column("wert")
        .list(this._client);
return select;
    }
    updateItems (item: Luft): Luft{

        return item;
    }
    createItems (item: Luft): Luft{
    //    "insert into Luft("wert") values("item.wert")"
        return item;
    }
    deleteItems (ID: number[]){

    }
}