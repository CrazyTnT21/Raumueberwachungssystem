import {Client} from "pg";
import {Temperature} from "../classes/temperature";
import {TemperatureRepository} from "./interfaces/temperature-repository";
import {Lazy, LazyPromise} from "../lazy";
import {Condition, Select, SortDirection} from "../db/select";
import {airMapping} from "../db/mappings/air-mapping";
import {temperatureMapping} from "../db/mappings/temperature-mapping";

export class DefaultTemperatureRepository implements TemperatureRepository
{
    constructor(private readonly dbClient: () => Client)
    {
    }

    private async getById(id: number): Promise<Temperature>
    {
        return await new Select(temperatureMapping)
            .whereValue("id", id)
            .single(this.dbClient());
    }

    async getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Temperature[] }>
    {
        const select = new Select(temperatureMapping)
            .whereValue("room.name", roomName,Condition.iLike);
        const total = await select.count(this.dbClient());
        const items = await select.offset(50 * page)
            .limit(limit)
            .list(this.dbClient());
        return {total, items};
    }

    async createItem(item: Temperature): Promise<LazyPromise<Temperature>>
    {
        const client = this.dbClient();
        await client.connect();
        const result = await client.query<Temperature>("insert into temperature(valuecelsius, measured, fkroom) values($1,$2,$3) returning *", [item.valueCelsius, item.measured, item.room.id])
        await client.end();
        return new LazyPromise(() => this.getById(result.rows[0].id));
    }

    async getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Temperature[]
    }>
    {
        const select = new Select(temperatureMapping)
            .whereValue("measured", from, Condition.bigger)
            .whereValue("measured", to, Condition.smaller)
            .whereValue("room.name", roomName,Condition.iLike);
        const total = await select.count(this.dbClient());
        const items = await select.offset(50 * page)
            .limit(limit)
            .list(this.dbClient());
        return {total, items};
    }

    async getLatestItem(roomName: string): Promise<Temperature>
    {
        return await new Select(temperatureMapping)
            .order("id", SortDirection.descending)
            .limit(1)
            .whereValue("room.name", roomName,Condition.iLike)
            .single(this.dbClient());
    }
}