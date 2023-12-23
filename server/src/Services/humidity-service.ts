import {Humidity} from "../classes/humidity";

export class HumidityService
{
    constructor()
    {

    }

    getItems()
    {
        return ["Test"];
    }

    updateItems(item: Humidity): Humidity
    {
        return item;
    }

    createItems(item: Humidity): Humidity
    {
        return item;
    }

    deleteItems(ids: number[])
    {

    }
}