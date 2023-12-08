import {Client} from "pg";

export class Create<T>
{
    private readonly table: string;
    public constructor(table: string)
    {
        this.table = table;
    }
}
