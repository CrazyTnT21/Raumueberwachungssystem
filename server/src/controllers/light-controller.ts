import {LightService} from "../services/interfaces/light-service";
import {Light} from "../classes/light";
import {Room} from "../classes/room";

export class LightController
{
    public constructor(private readonly lightService: LightService)
    {
    }

    async getItems(req: any): Promise<Light[]>
    {
        return this.lightService.getItems(0,50)
    }

    async getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Light[]>
    {
        return [];
    }

    async getLatestItem(): Promise<Light>
    {
        return new Light(0, new Date(), new Room(1,""));
    }
}