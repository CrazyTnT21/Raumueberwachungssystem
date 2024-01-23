export class Lazy<T>
{
    private item: T | undefined;

    get value(): T
    {
        if (this.item === undefined)
            this.item = this.valueFunction()

        return this.item;
    }

    constructor(private readonly valueFunction: () => T)
    {
    }
}