import {Humidity} from "../../classes/humidity";
import {LazyPromise} from "../../lazy";

export interface HumidityService
{
    getLatestItem(roomName: string): Promise<Humidity>;

    getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Humidity[] }>;

    getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Humidity[]
    }>;

    createItem(item: Humidity): Promise<LazyPromise<Humidity>>
}