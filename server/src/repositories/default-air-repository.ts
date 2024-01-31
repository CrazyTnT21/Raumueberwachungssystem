import {Client} from "pg";
import {Air} from "../classes/air";
import {AirRepository} from "./interfaces/air-repository";
import {LazyPromise} from "../lazy";
import {Condition, Select, SortDirection} from "../db/select";
import {airMapping} from "../db/mappings/air-mapping";

export class DefaultAirRepository implements AirRepository
{
    constructor(private readonly dbClient: () => Client)
    {
    }

    private async getById(id: number): Promise<Air>
    {
        return await new Select(airMapping)
            .whereValue("id", id)
            .single(this.dbClient());
    }

    async getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Air[] }>
    {
        const select = new Select(airMapping)
            .whereValue("room.name", roomName,Condition.iLike);
        const total = await select.count(this.dbClient());
        const items = await select.offset(50 * page)
            .limit(limit)
            .list(this.dbClient());
        return {total, items};
    }

    async createItem(item: Air): Promise<LazyPromise<Air>>
    {
        const client = this.dbClient();
        await client.connect();
        const result = await client.query<Air>("insert into air(value, measured, fkroom) values($1,$2,$3) returning *", [item.value, item.measured, item.room.id])
        await client.end();
        return new LazyPromise(() => this.getById(result.rows[0].id));
    }

    async getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Air[]
    }>
    {
        const select = new Select(airMapping)
            .whereValue("measured", from, Condition.bigger)
            .whereValue("measured", to, Condition.smaller)
            .whereValue("room.name", roomName,Condition.iLike);
        const total = await select.count(this.dbClient());
        const items = await select.offset(50 * page)
            .limit(limit)
            .list(this.dbClient());
        return {total, items};
    }

    async getLatestItem(roomName: string): Promise<Air>
    {
        return await new Select(airMapping)
            .order("id", SortDirection.descending)
            .limit(1)
            .whereValue("room.name", roomName,Condition.iLike)
            .single(this.dbClient());
    }
}