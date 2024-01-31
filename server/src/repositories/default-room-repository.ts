import {Client} from "pg";
import {Room} from "../classes/room";
import {RoomRepository} from "./interfaces/room-repository";
import {LazyPromise} from "../lazy";
import {Condition, Select} from "../db/select";
import {roomMapping} from "../db/mappings/room-mapping";

export class DefaultRoomRepository implements RoomRepository
{
    constructor(private readonly dbClient: () => Client)
    {
    }

    async getItem(id: number): Promise<Room>
    {
        return await new Select(roomMapping)
            .whereValue("id", id)
            .single(this.dbClient());
    }

    async getItems(search: string, page: number, limit: number): Promise<{ total: number, items: Room[] }>
    {
        const select = new Select(roomMapping);

        if (search && search != "")
            select.whereValue("name", "%" + search + "%", Condition.iLike);
        
        const total = await select.count(this.dbClient());
        const items = await select.offset(50 * page)
            .limit(limit)
            .list(this.dbClient());
        return {total, items};
    }

    async createItem(item: Room): Promise<LazyPromise<Room>>
    {
        const client = this.dbClient();
        await client.connect();
        const result = await client.query<Room>("insert into room(name) values($1) returning *", [item.name])
        await client.end();
        return new LazyPromise(() => this.getItem(result.rows[0].id));
    }
}