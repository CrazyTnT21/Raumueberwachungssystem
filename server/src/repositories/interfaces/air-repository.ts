import {Air} from "../../classes/air";
import {Lazy, LazyPromise} from "../../lazy";


export interface AirRepository
{
    getLatestItem(roomName: string): Promise<Air>;

    getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Air[] }>;

    getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Air[]
    }>;

    createItem(item: Air): Promise<LazyPromise<Air>>
}