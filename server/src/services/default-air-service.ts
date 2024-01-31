import {Air} from "../classes/air";
import {AirService} from "./interfaces/air-service";
import {AirRepository} from "../repositories/interfaces/air-repository";
import {Lazy, LazyPromise} from "../lazy";

export class DefaultAirService implements AirService
{
    constructor(private readonly airRepository: AirRepository)
    {
    }

    createItem(item: Air): Promise<LazyPromise<Air>>
    {
        return this.airRepository.createItem(item);
    }

    getItems(roomName: string,page: number, limit: number): Promise<{ total: number, items: Air[] }>
    {
        return this.airRepository.getItems(roomName,page, limit);
    }

    getItemsByTimespan(roomName: string,from: Date, to: Date, page: number, limit: number): Promise<{ total: number, items: Air[] }>
    {
        return this.airRepository.getItemsByTimespan(roomName,from, to, page, limit);
    }

    getLatestItem(roomName: string,): Promise<Air>
    {
        return this.airRepository.getLatestItem(roomName);
    }
}
