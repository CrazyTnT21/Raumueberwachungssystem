import {Temperature} from "../classes/temperature";
import {TemperatureService} from "./interfaces/temperature-service";
import {TemperatureRepository} from "../repositories/interfaces/temperature-repository";
import {Lazy, LazyPromise} from "../lazy";

export class DefaultTemperatureService implements TemperatureService
{
    constructor(private readonly temperatureRepository: TemperatureRepository)
    {
    }

    createItem(item: Temperature): Promise<LazyPromise<Temperature>>
    {
        return this.temperatureRepository.createItem(item);
    }

    getItems(roomName: string,page: number, limit: number): Promise<{ total: number, items: Temperature[] }>
    {
        return this.temperatureRepository.getItems(roomName,page, limit);
    }

    getItemsByTimespan(roomName: string,from: Date, to: Date, page: number, limit: number): Promise<{ total: number, items: Temperature[] }>
    {
        return this.temperatureRepository.getItemsByTimespan(roomName,from, to, page, limit);
    }

    getLatestItem(roomName: string,): Promise<Temperature>
    {
        return this.temperatureRepository.getLatestItem(roomName);
    }
}
