import {Client} from "pg";
import {Light} from "../classes/light";
import {Room} from "../classes/room";
import {LightRepository} from "./interfaces/light-repository";

export class DefaultLightRepository  implements LightRepository
{
    constructor(private readonly dbClient: Client)
    {
    }

    async getItems(): Promise<Light[]>
    {
        return [];
    }

    async createItem(item: Light): Promise<Light>
    {
        return item;
    }

    async getItemsByTimespan(from: Date, to: Date): Promise<Light[]>
    {
        return [];
    }

    async getLatestItem(): Promise<Light>
    {
        return new Light(10, new Date(), new Room(""));
    }
}