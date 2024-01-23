import {Light} from "../classes/light";
import {LightService} from "./interfaces/light-service";
import {LightRepository} from "../repositories/interfaces/light-repository";
import {Lazy} from "../lazy";

export class DefaultLightService implements LightService
{
    constructor(private readonly lightRepository: LightRepository)
    {
    }

    createItem(item: Light): Promise<Lazy<Promise<Light>>>
    {
        return this.lightRepository.createItem(item);
    }

    getItems(page: number, limit: number): Promise<Light[]>
    {
        return this.lightRepository.getItems(getPage(page), getLimit(limit));
    }

    getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Light[]>
    {
        return this.lightRepository.getItemsByTimespan(from, to, getPage(page), getLimit(limit));
    }

    getLatestItem(): Promise<Light>
    {
        return this.lightRepository.getLatestItem();
    }
}

export function getPage(page: number)
{
    if (page < 50000 && page >= 0)
        return page;
    return 0;
}

export function getLimit(limit: number)
{
    if (limit < 50 && limit >= 0)
        return limit;
    return 50;
}