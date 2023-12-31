import {Air} from "../classes/air";
import {AirRepository} from "../repositories/interfaces/air-repository";
import {AirService} from "./interfaces/air-service";
import {Room} from "../classes/room";

export class DefaultAirService implements AirService
{
    constructor(private readonly airRepository: AirRepository)
    {
    }

    async createItem(item: Air): Promise<Air>
    {
        return item;
    }

    async getItems(page: number, limit: number): Promise<Air[]>
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