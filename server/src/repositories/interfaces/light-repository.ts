import {Light} from "../../classes/light";


export interface LightRepository
{
    getLatestItem(): Promise<Light>;

    getItems(page: number, limit: number): Promise<Light[]>;

    getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Light[]>;

    createItem(item: Light): Promise<Light>
}