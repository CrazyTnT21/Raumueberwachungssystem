import {AirService} from "../services/interfaces/air-service";
import {Air} from "../classes/air";

export class AirController
{
    public constructor(private readonly airService: AirService)
    {
    }


    async getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Air[] }>
    {
        return await this.airService.getItems(roomName, page, limit);
    }

    async getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Air[]
    }>
    {
        return this.airService.getItemsByTimespan(roomName, from, to, page, limit);
    }

    async getLatestItem(roomName: string): Promise<Air | null>
    {
        return this.airService.getLatestItem(roomName);
    }
}