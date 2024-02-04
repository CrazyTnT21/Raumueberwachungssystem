export class Endpoint<T>
{
    result: T;
    count: number;
    total: number;
    links: Link[];

    constructor(items: T,count: number, links: Link[],total: number)
    {
        this.result = items;
        this.count = count;
        this.links = links;
        this.total = total;
    }
}

export class Link
{
    base: string;
    self: string;
    previous: string | undefined;
    next: string | undefined;

    constructor(base: string, self: string, previous: string | null = null, next: string | null = null)
    {
        this.base = base;
        this.self = self;
        if (previous)
            this.previous = previous;
        if (next)
            this.next = next;
    }
}