import {Temperature} from "../classes/temperature";
import {Room} from "../classes/room";
import {TemperatureService} from "./interfaces/temperature-service";
import {TemperatureRepository} from "../repositories/interfaces/temperature-repository";

export class DefaultTemperatureService implements TemperatureService
{
    constructor(private readonly temperatureRepository: TemperatureRepository)
    {
    }

    async createItem(item: Temperature): Promise<Temperature>
    {
        return item;
    }

    async getItems(page: number, limit: number): Promise<Temperature[]>
    {
        return []
    }

    async getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Temperature[]>
    {
        return []
    }

    async getLatestItem(): Promise<Temperature>
    {
        return new Temperature(0, new Date(), new Room(""));
    }
}