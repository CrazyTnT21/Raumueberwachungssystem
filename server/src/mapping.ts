export interface Mapping<T>
{
    table: string;
    mapping: { [property in keyof T]?: string | KeyJoin<T>; };
}

export class KeyJoin<T>
{
    constructor(public mapping: Mapping<T>, public readonly column: string, public readonly otherColumn: string)
    {
    }
}