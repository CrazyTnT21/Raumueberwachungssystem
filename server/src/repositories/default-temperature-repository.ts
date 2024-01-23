import {Temperature} from "../classes/temperature";
import {Client} from "pg";
import {Room} from "../classes/room";
import {TemperatureRepository} from "./interfaces/temperature-repository";

export class DefaultTemperatureRepository implements TemperatureRepository
{
    constructor(private readonly dbClient: Client)
    {
    }

    async getItems(): Promise<Temperature[]>
    {
        return [];
    }

    async createItem(item: Temperature): Promise<Temperature>
    {
        return item;
    }

    async getItemsByTimespan(from: Date, to: Date): Promise<Temperature[]>
    {
        return [];
    }

    async getLatestItem(): Promise<Temperature>
    {
        return new Temperature(10, new Date(), new Room(1,""));
    }
}