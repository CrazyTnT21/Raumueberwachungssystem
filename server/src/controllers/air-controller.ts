import {Air} from "../classes/air";
import {Room} from "../classes/room";

class AirService
{
}

export class AirController
{
    public constructor(private readonly airService: AirService)
    {
    }

    async createItem(req: any): Promise<Air>
    {
        return <Air>{};
    }

    async getItems(req: any): Promise<Air[]>
    {
        return [];
    }

    async getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Air[]>
    {
        return [];
    }

    async getLatestItem(): Promise<Air>
    {
        return new Air(0, new Date(), new Room(""));
    }
}