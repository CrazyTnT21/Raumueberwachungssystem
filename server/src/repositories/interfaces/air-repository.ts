import {Air} from "../../classes/air";

export interface AirRepository
{
    getLatestItem(): Promise<Air>;

    getItems(page: number, limit: number): Promise<Air[]>;

    getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Air[]>;

    createItem(item: Air): Promise<Air>
}