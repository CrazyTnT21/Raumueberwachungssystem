import {Light} from "../../classes/light";
import {LazyPromise} from "../../lazy";

export interface LightService
{
    getLatestItem(roomName: string): Promise<Light>;

    getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Light[] }>;

    getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Light[]
    }>;

    createItem(item: Light): Promise<LazyPromise<Light>>
}