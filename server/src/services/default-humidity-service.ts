import {Humidity} from "../classes/humidity";
import {HumidityService} from "./interfaces/humidity-service";
import {HumidityRepository} from "../repositories/interfaces/humidity-repository";
import {Lazy, LazyPromise} from "../lazy";

export class DefaultHumidityService implements HumidityService
{
    constructor(private readonly humidityRepository: HumidityRepository)
    {
    }

    createItem(item: Humidity): Promise<LazyPromise<Humidity>>
    {
        return this.humidityRepository.createItem(item);
    }

    getItems(roomName: string,page: number, limit: number): Promise<{ total: number, items: Humidity[] }>
    {
        return this.humidityRepository.getItems(roomName,page, limit);
    }

    getItemsByTimespan(roomName: string,from: Date, to: Date, page: number, limit: number): Promise<{ total: number, items: Humidity[] }>
    {
        return this.humidityRepository.getItemsByTimespan(roomName,from, to, page, limit);
    }

    getLatestItem(roomName: string,): Promise<Humidity>
    {
        return this.humidityRepository.getLatestItem(roomName);
    }
}
