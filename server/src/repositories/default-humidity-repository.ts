import {Client} from "pg";
import {Humidity} from "../classes/humidity";
import {HumidityRepository} from "./interfaces/humidity-repository";
import {LazyPromise} from "../lazy";
import {Condition, Select, SortDirection} from "../db/select";
import {humidityMapping} from "../db/mappings/humidity-mapping";

export class DefaultHumidityRepository implements HumidityRepository
{
    constructor(private readonly dbClient: () => Client)
    {
    }

    private async getById(id: number): Promise<Humidity>
    {
        return await new Select(humidityMapping)
            .whereValue("id", id)
            .single(this.dbClient());
    }

    async getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Humidity[] }>
    {
        const select = new Select(humidityMapping)
            .whereValue("room.name", roomName, Condition.iLike);
        const total = await select.count(this.dbClient());
        const items = await select.offset(50 * page)
            .limit(limit)
            .list(this.dbClient());
        return {total, items};
    }

    async createItem(item: Humidity): Promise<LazyPromise<Humidity>>
    {
        const client = this.dbClient();
        await client.connect();
        const result = await client.query<Humidity>("insert into humidity(valuePercentage, measured, fkroom) values($1,$2,$3) returning *", [item.valuePercentage, item.measured, item.room.id])
        await client.end();
        return new LazyPromise(() => this.getById(result.rows[0].id));
    }

    async getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Humidity[]
    }>
    {
        const select = new Select(humidityMapping)
            .whereValue("measured", from, Condition.bigger)
            .whereValue("measured", to, Condition.smaller)
            .whereValue("room.name", roomName, Condition.iLike);
        const total = await select.count(this.dbClient());
        const items = await select.offset(50 * page)
            .limit(limit)
            .list(this.dbClient());
        return {total, items};
    }

    async getLatestItem(roomName: string): Promise<Humidity>
    {
        return await new Select(humidityMapping)
            .order("id", SortDirection.descending)
            .limit(1)
            .whereValue("room.name", roomName, Condition.iLike)
            .single(this.dbClient());
    }
}