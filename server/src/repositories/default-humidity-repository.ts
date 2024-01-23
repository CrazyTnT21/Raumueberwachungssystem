import {Humidity} from "../classes/humidity";
import {Client} from "pg";
import {Room} from "../classes/room";
import {HumidityRepository} from "./interfaces/humidity-repository";

export class DefaultHumidityRepository  implements HumidityRepository
{
    constructor(private readonly dbClient: Client)
    {
    }

    async getItems(): Promise<Humidity[]>
    {
        return [];
    }

    async createItem(item: Humidity): Promise<Humidity>
    {
        return item;
    }

    async getItemsByTimespan(from: Date, to: Date): Promise<Humidity[]>
    {
        return [];
    }

    async getLatestItem(): Promise<Humidity>
    {
        return new Humidity(10, new Date(), new Room(1,""));
    }
}