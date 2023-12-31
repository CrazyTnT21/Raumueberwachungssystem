import {Light} from "../classes/light";
import {Room} from "../classes/room";
import {LightService} from "./interfaces/light-service";
import {LightRepository} from "../repositories/interfaces/light-repository";

export class DefaultLightService implements LightService
{
    constructor(private readonly lightRepository: LightRepository)
    {
    }

    async createItem(item: Light): Promise<Light>
    {
        return item;
    }

    async getItems(page: number, limit: number): Promise<Light[]>
    {
        return []
    }

    async getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Light[]>
    {
        return []
    }

    async getLatestItem(): Promise<Light>
    {
        return new Light(0, new Date(), new Room(""));
    }
}