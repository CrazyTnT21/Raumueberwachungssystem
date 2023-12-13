import { Feuchtigkeit } from "../classes/Feuchtigkeit";

export class Feuchtigkeitservice {

    constructor(){
        
    }
    getItems (){
        return ["Test"

        ];
    }
    updateItems (item: Feuchtigkeit): Feuchtigkeit{
     //   "update Feuchtigkeit set wert = item.wert where id = item.id
        return item;
    }
    createItems (item: Feuchtigkeit): Feuchtigkeit{
    //    "insert into Feuchtigkeit("wert") values("item.wert")"
        return item;
    }
    deleteItems (ID: number[]){

    }
}