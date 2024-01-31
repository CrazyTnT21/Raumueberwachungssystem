import {LightService} from "../services/interfaces/light-service";
import {Light} from "../classes/light";

export class LightController
{
    public constructor(private readonly lightService: LightService)
    {
    }


    async getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Light[] }>
    {
        return await this.lightService.getItems(roomName, page, limit);
    }

    async getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Light[]
    }>
    {
        return this.lightService.getItemsByTimespan(roomName, from, to, page, limit);
    }

    async getLatestItem(roomName: string): Promise<Light | null>
    {
        return this.lightService.getLatestItem(roomName);
    }
}