import {Client, Query} from "pg";
import {KeyJoin, Mapping} from "../mapping";
import {roomMapping} from "./mappings/room-mapping";

export class ExpandedKeyJoin<T>
{
    constructor(public mapping: ExpandedMapping<T>, readonly column: string, readonly otherColumn: string)
    {
    }
}

class ExpandedMapping<T>
{
    private count = 0;
    readonly table: string;
    readonly alias: string;
    mapping: { [p in keyof T]: string | ExpandedKeyJoin<any> | undefined };

    constructor(mapping: Mapping<T>)
    {
        const map = this.setRecursively(mapping);
        this.table = map.table;
        this.mapping = <{ [p in keyof T]: string | ExpandedKeyJoin<any> }>map.mapping;
        this.alias = map.alias;
    }

    private setAlias(mapping: Mapping<any>)
    {
        this.count++;
        return mapping.table[0] + this.count
    }

    private setRecursively(mapping: Mapping<any>)
    {
        let newObject = {alias: this.setAlias(mapping), ...mapping};
        const keys = <(keyof T)[]>Object.keys(mapping.mapping);
        for (const key of keys)
        {
            if (typeof mapping.mapping[key] != "string")
            {
                (<KeyJoin<any>>newObject.mapping[key]).mapping = this.setRecursively((<KeyJoin<any>>mapping.mapping[key]).mapping);
            }
        }
        return newObject;
    }

}

export class Select<T>
{
    private readonly mapping: ExpandedMapping<T>;
    private _limit: number | undefined;
    private _offset: number | undefined;

    private readonly whereColumns: {
        property: string,
        otherProperty: string,
        multiType: MultiType,
        condition: Condition
    }[] = [];

    private readonly orders: { property: string, direction: SortDirection }[] = [];
    private whereValues: { property: string, value: any, multiType: MultiType, condition: Condition }[] = [];

    public constructor(mapping: Mapping<T>)
    {
        this.mapping = new ExpandedMapping(mapping);
    }

    public column(property: keyof T): this
    {
        if (this.mapping.mapping[property])
            throw new Error(`Property '${property.toString()}' does not exist on mapping '${this.mapping}'`)

        // count(this.columns, x => !!x.alias)
        return this;
    }

    public join(table: string, alias?: string | null, property?: keyof T): this
    {
        return this;
    }

    public offset(amount: number): this
    {
        this._offset = amount;
        return this;
    }

    public limit(amount: number): this
    {
        this._limit = amount;
        return this;
    }

    public async count(client: Client): Promise<number>
    {
        const query = this.createQuery("count(*)");
        const queryObject = {
            text: query.text, values: query.parameters, rowMode: 'array',
        }
        await client.connect()
        const res = await client.query(queryObject);
        await client.end()
        return res.rows[0][0];
    }

    public order(property: string, direction: SortDirection): this
    {
        this.orders.push({property, direction});
        return this;
    }

    public whereValue(property: string, value: any, condition: Condition = Condition.equal, multiType: MultiType = MultiType.and): this
    {
        this.whereValues.push({property, value, multiType, condition});
        return this;
    }

    private getMapping(property: string)
    {
        const split = property.split(".");

        let newMapping = this.mapping;
        for (let i = 0; i < split.length; i++)
        {
            const join = (<KeyJoin<any>>this.mapping.mapping[<keyof T>split[i]]);
            newMapping = <ExpandedMapping<any>>join.mapping;
        }
        return newMapping
    }

    public whereColumn(property: string, otherProperty: string, multiType: MultiType, condition: Condition): this
    {
        this.whereColumns.push({property, otherProperty, multiType, condition});
        return this;
    }

    public async list(client: Client): Promise<T[]>
    {
        const query = this.createQuery();
        const queryObject = {
            text: query.text, values: query.parameters, rowMode: 'array',
        }
        await client.connect()
        const res = await client.query(queryObject);
        await client.end()
        return res.rows.map(x => this.itemFromRow(this.mapping, x, 0))
    }

    public async single(client: Client): Promise<T>
    {
        return (await this.list(client))[0];
    }

    private itemFromRow(mapping: ExpandedMapping<any>, row: any[], index: number)
    {
        const item: any = {};
        const keys = <(keyof T)[]>Object.keys(mapping.mapping);

        for (let i = 0; i < keys.length; i++)
        {
            if (typeof mapping.mapping[keys[i]] == "string")
            {
                item[keys[i]] = row[index];
            }
            else
            {
                item[keys[i]] = this.itemFromRow((<ExpandedKeyJoin<any>>mapping.mapping[keys[i]]).mapping, row, index);
            }
            index++;
        }
        return item;
    }

    private columnsFromMapping(mapping: ExpandedMapping<any>): { alias: string, columns: string[] }[]
    {
        const result = [];
        const keys = <(keyof T)[]>Object.keys(mapping.mapping);

        const joins = keys.filter(x => typeof mapping.mapping[x] != "string");

        result.push(
            {
                alias: mapping.alias,
                columns: keys
                    .filter(x => typeof mapping.mapping[x] == "string")
                    .map(x => <string>mapping.mapping[x])
            }
        );
        for (const join of joins)
        {
            const joinMapping = (<ExpandedKeyJoin<any>>mapping.mapping[join]).mapping;
            result.push(...this.columnsFromMapping(joinMapping));
        }
        return result;
    }

    private joinsFromMapping(mapping: ExpandedMapping<any>): {
        table: string,
        alias: string,
        from: string,
        to: string
    }[]
    {
        const result = []
        const keys = <(keyof T)[]>Object.keys(mapping.mapping);

        const joins = keys.filter(x => typeof mapping.mapping[x] != "string");

        for (const join of joins)
        {
            const keyJoin = (<ExpandedKeyJoin<any>>mapping.mapping[join]);
            const table = keyJoin.mapping.table;
            const alias = keyJoin.mapping.alias
            const from = mapping.alias + "." + keyJoin.column;
            const to = alias + "." + keyJoin.otherColumn;
            result.push({table, alias, from, to})

            result.push(...this.joinsFromMapping(keyJoin.mapping))
        }
        return result;
    }

    private getSymbol(condition: Condition)
    {
        switch (condition)
        {
            case Condition.equal:
                return "="
            case Condition.notEqual:
                return "!="
            case Condition.in:
                return " IN "
            case Condition.notIn:
                return "NOT IN "
            case Condition.like:
                return " LIKE ";
            case Condition.notLike:
                return " NOT LIKE ";
            case Condition.iLike:
                return " ILIKE ";
            case Condition.notILike:
                return " NOT ILIKE ";
            case Condition.bigger:
                return ">";
            case Condition.smaller:
                return "<";
        }
    }

    private fromWhere(mapping: ExpandedMapping<any>, values: any[])
    {
        if (this.whereValues.length == 0 && this.whereColumns.length == 0)
            return "";
        let query = " WHERE ";
        for (const where of this.whereValues)
        {
            const split = where.property.split(".");
            let newMapping = mapping;
            for (let i = 0; i < split.length - 1; i++)
            {
                if (typeof newMapping.mapping[split[i]] != "object")
                    throw new Error(`Property '${split[i]}' is not a valid mapping`)
                newMapping = (<ExpandedKeyJoin<any>>newMapping.mapping[split[i]]).mapping;
            }
            values.push(where.value);
            if (query != " WHERE ")
                query += " AND ";
            query += newMapping.alias + "." + newMapping.mapping[split[split.length - 1]] + this.getSymbol(where.condition) + "$" + values.length;

        }
        for (const where of this.whereColumns)
        {
            const split = where.property.split(".");
            let newMapping = mapping;
            for (let i = 0; i < split.length - 1; i++)
            {
                if (typeof newMapping.mapping[split[i]] != "object")
                    throw new Error(`Property '${split[i]}' is not a valid mapping`)
                newMapping = (<ExpandedKeyJoin<any>>newMapping.mapping[split[i]]).mapping;
            }
            const otherSplit = where.otherProperty.split(".");
            let otherMapping = mapping;
            for (let i = 0; i < otherSplit.length - 1; i++)
            {
                if (typeof otherMapping.mapping[otherSplit[i]] != "object")
                    throw new Error(`Property '${otherSplit[i]}' is not a valid mapping`)
                otherMapping = (<ExpandedKeyJoin<any>>otherMapping.mapping[otherSplit[i]]).mapping;
            }
            if (query != " WHERE ")
                query += " AND ";
            query += newMapping.alias + "." + newMapping.mapping[split[split.length - 1]] + "=" + otherMapping.alias + "." + otherMapping.mapping[split[split.length - 1]];
        }
        return query;
    }

    private fromOrder(mapping: ExpandedMapping<any>)
    {
        if (this.orders.length == 0)
            return "";
        let query = " ORDER BY ";
        for (const order of this.orders)
        {
            const split = order.property.split(".");
            let newMapping = mapping;
            for (let i = 0; i < split.length - 1; i++)
            {
                if (typeof newMapping.mapping[split[i]] != "object")
                    throw new Error(`Property '${split[i]}' is not a valid mapping`)
                newMapping = (<ExpandedKeyJoin<any>>newMapping.mapping[split[i]]).mapping;
            }
            if (query != " ORDER BY ")
                query += ",";
            query += " " + newMapping.alias + "." + newMapping.mapping[split[split.length - 1]];
            if (order.direction == SortDirection.ascending)
                query += " ASC "
            else
                query += " DESC "
        }
        return query;
    }

    private createQuery(func: string | null = null): { text: string, parameters: any[] }
    {
        let query = "SELECT ";
        const values: any[] = [];
        const columns = this.columnsFromMapping(this.mapping);
        if (func)
            query += func;
        else
            query += columns.map(x => x.columns.map((y: string) => x.alias + "." + y).join(","))

        query += ` FROM ${this.mapping.table} AS ${this.mapping.alias}`;

        const joins = this.joinsFromMapping(this.mapping);
        query += joins.map(x => ` LEFT JOIN ${x.table} AS ${x.alias} ON ${x.from} = ${x.to}`)

        query += this.fromWhere(this.mapping, values);

        query += this.fromOrder(this.mapping);

        if (this._offset)
            query += " OFFSET " + this._offset

        if (this._limit)
            query += " LIMIT " + this._limit;

        console.log(query)
        return {text: query, parameters: values};
    }

    private createColumnText(column: { identifier: string | null, column: string })
    {
        if (column.identifier)
            return `${column.identifier}.${column.column}`;
        return `${this.mapping.table}.${column.column}`;
    }
}

export enum SortDirection
{
    ascending, descending
}

export enum MultiType
{
    and, or
}

export enum Condition
{
    equal, notEqual, in, notIn, like, notLike, iLike, notILike, bigger, smaller
}