import {Client} from "pg";
import {Light} from "../classes/light";
import {LightRepository} from "./interfaces/light-repository";
import {LazyPromise} from "../lazy";
import {Condition, Select, SortDirection} from "../db/select";
import {lightMapping} from "../db/mappings/light-mapping";
import {maxLimit} from "../routes";

export class DefaultLightRepository implements LightRepository
{
    constructor(private readonly dbClient: () => Client)
    {
    }

    private async getById(id: number): Promise<Light>
    {
        return await new Select(lightMapping)
            .whereValue("id", id)
            .single(this.dbClient());
    }

    async getItems(roomName: string, page: number, limit: number): Promise<{ total: number, items: Light[] }>
    {
        const select = new Select(lightMapping)
            .whereValue("room.name", roomName, Condition.iLike);
        const total = await select.count(this.dbClient());
        const items = await select.offset(maxLimit * page)
            .limit(limit)
            .list(this.dbClient());
        return {total, items};
    }

    async createItem(item: Light): Promise<LazyPromise<Light>>
    {
        const client = this.dbClient();
        await client.connect();
        const result = await client.query<Light>("insert into light(value, measured, fkroom) values($1,$2,$3) returning *", [item.value, item.measured, item.room.id])
        await client.end();
        return new LazyPromise(() => this.getById(result.rows[0].id));
    }

    async getItemsByTimespan(roomName: string, from: Date, to: Date, page: number, limit: number): Promise<{
        total: number,
        items: Light[]
    }>
    {
        const select = new Select(lightMapping)
            .whereValue("measured", from, Condition.bigger)
            .whereValue("measured", to, Condition.smaller)
            .whereValue("room.name", roomName, Condition.iLike);
        const total = await select.count(this.dbClient());
        const items = await select.offset(maxLimit * page)
            .limit(limit)
            .list(this.dbClient());
        return {total, items};
    }

    async getLatestItem(roomName: string): Promise<Light>
    {
        return await new Select(lightMapping)
            .order("id", SortDirection.descending)
            .limit(1)
            .whereValue("room.name", roomName, Condition.iLike)
            .single(this.dbClient());
    }
}