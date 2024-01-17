export class Endpoint<T>
{
    items: T[];
    count: number;
    links: Link[];

    constructor(items: T[], links: Link[])
    {
        this.items = items;
        this.count = this.items.length;
        this.links = links;
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