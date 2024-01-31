import {HumidityService} from "../services/interfaces/humidity-service";
import {Humidity} from "../classes/humidity";

export class HumidityController
{
    public constructor(private readonly humidityService: HumidityService)
    {
    }


    async getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Humidity[] }>
    {
        return await this.humidityService.getItems(roomName, page, limit);
    }

    async getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Humidity[]
    }>
    {
        return this.humidityService.getItemsByTimespan(roomName, from, to, page, limit);
    }

    async getLatestItem(roomName: string): Promise<Humidity | null>
    {
        return this.humidityService.getLatestItem(roomName);
    }
}