import {Air} from "../classes/air";
import {Endpoint, Link} from "../endpoint";
import {AirService} from "../services/interfaces/air-service";
import {SERVER_URL} from "../index";

export class AirController
{
    public constructor(private readonly airService: AirService)
    {
    }

    async handleRequests(req: any, res: any): Promise<void>
    {
        const result: Endpoint<Air> = this.transformEndpoint(await this.routeEndpoints(req));
        res.send(result);
    }

    transformEndpoint(value: Air[]): Endpoint<Air>
    {
        const links: Link[] = [new Link(SERVER_URL, SERVER_URL + "/air")]
        return new Endpoint(value, links);
    }

    transformQuery(req: any)
    {
        const query = req.query;
        const page: number = query.page && query.page >= 0 ? query.page : 0;
        const limit: number = query.limit && query.limit >= 0 && query.limit <= 50 ? query.limit : 50;

        /*TODO: validate*/
        const from: Date = query.from;
        const to: Date = query.to;

        return {query, page, limit, from, to}
    }

    async routeEndpoints(req: any): Promise<Air[]>
    {
        const query = this.transformQuery(req);

        if (query.from)
        {
            return this.getItemsByTimespan(query.from, query.to, query.page, query.limit);
        }
        return this.getItems(query.page, query.limit);
    }

    async getItems(page: number, limit: number): Promise<Air[]>
    {
        return await this.airService.getItems(page, limit);
    }

    async getItemsByTimespan(from: Date, to: Date, page: number, limit: number): Promise<Air[]>
    {
        return this.airService.getItemsByTimespan(from, to, page, limit);
    }

    async getLatestItem(): Promise<Air>
    {
        return this.airService.getLatestItem();
    }
}