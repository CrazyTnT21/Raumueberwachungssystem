export class Lazy<T>
{
    private item: T | undefined;

    value(): T
    {
        this.item = this.valueFunction()
        this.value = () => this.item!;

        return this.item;
    }

    constructor(private readonly valueFunction: () => T)
    {
    }
}

export class LazyPromise<T>
{
    private item: T | undefined;

    async value(): Promise<T>
    {
        this.item = await this.valueFunction()
        this.value = async () => this.item!;

        return this.item;
    }

    constructor(private readonly valueFunction: () => Promise<T>)
    {
    }
}