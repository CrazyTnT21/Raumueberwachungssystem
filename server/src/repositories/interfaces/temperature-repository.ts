import {Temperature} from "../../classes/temperature";
import {Lazy, LazyPromise} from "../../lazy";


export interface TemperatureRepository
{
    getLatestItem(roomName: string): Promise<Temperature>;

    getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Temperature[] }>;

    getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Temperature[]
    }>;

    createItem(item: Temperature): Promise<LazyPromise<Temperature>>
}