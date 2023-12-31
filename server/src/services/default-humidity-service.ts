import {Humidity} from "../classes/humidity";
import {Room} from "../classes/room";
import {HumidityService} from "./interfaces/humidity-service";
import {HumidityRepository} from "../repositories/interfaces/humidity-repository";

export class DefaultHumidityService implements HumidityService
{
    constructor(private readonly humidityRepository: HumidityRepository)
    {
    }

    async createItem(item: Humidity): Promise<Humidity>
    {
        return item;
    }

    async getItems(page: number, limit: number): Promise<Humidity[]>
    {
        return [];
    }

    async getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Humidity[]>
    {
        return [];
    }

    async getLatestItem(): Promise<Humidity>
    {
        return new Humidity(0, new Date(), new Room(""));
    }
}