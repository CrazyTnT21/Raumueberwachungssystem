import {TemperatureService} from "../services/interfaces/temperature-service";
import {Temperature} from "../classes/temperature";
import {Room} from "../classes/room";

export class TemperatureController
{
    public constructor(private readonly temperatureService: TemperatureService)
    {
    }

    async createItem(req: any): Promise<Temperature>
    {
        return <Temperature>{};
    }

    async getItems(req: any): Promise<Temperature[]>
    {
        return [];
    }

    async getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Temperature[]>
    {
        return [];
    }

    async getLatestItem(): Promise<Temperature>
    {
        return new Temperature(0, new Date(), new Room(""));
    }
}