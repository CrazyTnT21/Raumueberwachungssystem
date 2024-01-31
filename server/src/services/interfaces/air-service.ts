import {Air} from "../../classes/air";
import {LazyPromise} from "../../lazy";

export interface AirService
{
    getLatestItem(roomName: string): Promise<Air>;

    getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Air[] }>;

    getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Air[]
    }>;

    createItem(item: Air): Promise<LazyPromise<Air>>
}