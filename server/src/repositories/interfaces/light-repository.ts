import {Light} from "../../classes/light";
import {Lazy, LazyPromise} from "../../lazy";


export interface LightRepository
{
    getLatestItem(roomName: string): Promise<Light>;

    getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Light[] }>;

    getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Light[]
    }>;

    createItem(item: Light): Promise<LazyPromise<Light>>
}