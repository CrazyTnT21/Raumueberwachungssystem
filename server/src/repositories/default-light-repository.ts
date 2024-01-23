import {Client} from "pg";
import {Light} from "../classes/light";
import {LightRepository} from "./interfaces/light-repository";
import {Lazy} from "../lazy";

export class DefaultLightRepository implements LightRepository
{
    constructor(private readonly dbClient: Client)
    {
    }

    private async getById(id: number): Promise<Light>
    {
        await this.dbClient.connect();
        const result = await this.dbClient.query<Light>("select * from light where id = $1", [id])
        await this.dbClient.end();
        return result.rows[0];
    }

    async getItems(page: number, limit: number): Promise<Light[]>
    {
        await this.dbClient.connect();
        const result = await this.dbClient.query<Light>("select * from light limit $1 offset $2 * 50", [limit, page])
        await this.dbClient.end();
        return result.rows;
    }

    async createItem(item: Light): Promise<Lazy<Promise<Light>>>
    {
        await this.dbClient.connect();
        const result = await this.dbClient.query<Light>("insert into light(value, measured, fkroom) values($1,$2,$3) returning *", [item.value, item.measured, item.room.id])
        await this.dbClient.end();
        return new Lazy(() => this.getById(result.rows[0].id));
    }

    async getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Light[]>
    {
        await this.dbClient.connect();
        const result = await this.dbClient.query<Light>("select * from light where measured > $1 and $2 < $2 limit $3 offset $4 * 50", [from, to, limit, page])
        await this.dbClient.end();
        return result.rows;
    }

    async getLatestItem(): Promise<Light>
    {
        await this.dbClient.connect();
        const result = await this.dbClient.query<Light>("select * from light order by id limit 1")
        await this.dbClient.end();
        return result.rows[0];
    }
}