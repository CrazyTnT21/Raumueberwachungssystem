import {Room} from "../classes/room";
import {Humidity} from "../classes/humidity";
import {HumidityService} from "../services/interfaces/humidity-service";

export class HumidityController
{
    public constructor(private readonly humidityService: HumidityService)
    {
    }

    async createItem(req: any): Promise<Humidity>
    {
        return <Humidity>{};
    }

    async getItems(req: any): Promise<Humidity[]>
    {
        return [];
    }

    async getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Humidity[]>
    {
        return [];
    }

    async getLatestItem(): Promise<Humidity>
    {
        return new Humidity(0, new Date(), new Room(""));
    }
}