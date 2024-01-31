import {Light} from "../classes/light";
import {LightService} from "./interfaces/light-service";
import {LightRepository} from "../repositories/interfaces/light-repository";
import {Lazy, LazyPromise} from "../lazy";

export class DefaultLightService implements LightService
{
    constructor(private readonly lightRepository: LightRepository)
    {
    }

    createItem(item: Light): Promise<LazyPromise<Light>>
    {
        return this.lightRepository.createItem(item);
    }

    getItems(roomName: string,page: number, limit: number): Promise<{ total: number, items: Light[] }>
    {
        return this.lightRepository.getItems(roomName,page, limit);
    }

    getItemsByTimespan(roomName: string,from: Date, to: Date, page: number, limit: number): Promise<{ total: number, items: Light[] }>
    {
        return this.lightRepository.getItemsByTimespan(roomName,from, to, page, limit);
    }

    getLatestItem(roomName: string,): Promise<Light>
    {
        return this.lightRepository.getLatestItem(roomName);
    }
}
