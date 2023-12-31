import {Temperature} from "../../classes/temperature";

export interface TemperatureService
{
    getLatestItem(): Promise<Temperature>;
    getItems(page: number, limit: number): Promise<Temperature[]>;

    getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Temperature[]>;

    createItem(item: Temperature): Promise<Temperature>
}