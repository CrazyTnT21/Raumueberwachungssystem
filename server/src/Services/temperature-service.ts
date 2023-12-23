import {Temperature} from "../classes/temperature";

export class TemperatureService
{

    constructor()
    {

    }

    getItems()
    {
        return ["Test"];
    }

    updateItems(item: Temperature): Temperature
    {
        //   "update Temperatur set wert = item.wert where id = item.id
        return item;
    }

    createItems(item: Temperature): Temperature
    {
        //    "insert into Temperatur("wert") values("item.wert")"
        return item;
    }

    deleteItems(ids: number[])
    {

    }
}