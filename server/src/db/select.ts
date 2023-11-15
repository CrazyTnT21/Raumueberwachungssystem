import {Client} from "pg";

export class Select<T>
{
    private readonly table: string;

    public constructor(table: string)
    {
        this.table = table;
    }

    private columns: { identifier: string | null, column: string }[] = [];
    private wheres = [];

    public column(column: string, identifier: string | null = null): this
    {
        this.columns.push({identifier: identifier, column: column})

        return this;
    }

    public async list(client: Client): Promise<T[]>
    {
        await client.connect()

        const query = this.createQuery();
        const res = await client.query(query.text, query.parameters)

        await client.end()
        return res.rows;
    }

    private createQuery(): { text: string, parameters: [] }
    {
        if (this.columns.length == 0)
            throw new Error("No columns, no values");

        let query = "SELECT " + this.createColumnText(this.columns[0]);

        for (let i = 1; i < this.columns.length; i++)
        {
            query += this.createColumnText(this.columns[i]);
        }
        query += ` FROM ${this.table}`;
        return {text: "", parameters: []};
    }

    private createColumnText(column: { identifier: string | null, column: string })
    {
        if (column.identifier)
            return `${column.identifier}.${column.column}`;
        return `${this.table}.${column.column}`;
    }
}
