import {Humidity} from "../../classes/humidity";

export interface HumidityRepository
{
    getLatestItem(): Promise<Humidity>;

    getItems(page: number, limit: number): Promise<Humidity[]>;

    getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Humidity[]>;

    createItem(item: Humidity): Promise<Humidity>
}