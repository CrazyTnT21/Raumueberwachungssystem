import { Temperatur } from "../classes/Temperatur";

export class Temperaturservice {

    constructor(){
        
    }
    getItems (){
        return ["Test"

        ];
    }
    updateItems (item: Temperatur): Temperatur{
     //   "update Temperatur set wert = item.wert where id = item.id
        return item;
    }
    createItems (item: Temperatur): Temperatur{
    //    "insert into Temperatur("wert") values("item.wert")"
        return item;
    }
    deleteItems (ID: number[]){

    }
}