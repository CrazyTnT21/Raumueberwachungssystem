import {Client} from "pg";
import {Air} from "../classes/air";
import {AirRepository} from "./interfaces/air-repository";
import {Room} from "../classes/room";

export class DefaultAirRepository implements AirRepository
{
    constructor(private readonly dbClient: Client)
    {
    }

    async getItems(): Promise<Air[]>
    {
        return [];
    }

    async createItem(item: Air): Promise<Air>
    {
        return item;
    }

    async getItemsByTimespan(from: Date, to: Date): Promise<Air[]>
    {
        return [];
    }

    async getLatestItem(): Promise<Air>
    {
        return new Air(10, new Date(), new Room(1, ""));
    }
}