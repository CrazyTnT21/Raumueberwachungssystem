import {TemperatureService} from "../services/interfaces/temperature-service";
import {Temperature} from "../classes/temperature";

export class TemperatureController
{
    public constructor(private readonly temperatureService: TemperatureService)
    {
    }


    async getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Temperature[] }>
    {
        return await this.temperatureService.getItems(roomName, page, limit);
    }

    async getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Temperature[]
    }>
    {
        return this.temperatureService.getItemsByTimespan(roomName, from, to, page, limit);
    }

    async getLatestItem(roomName: string): Promise<Temperature | null>
    {
        return this.temperatureService.getLatestItem(roomName);
    }
}