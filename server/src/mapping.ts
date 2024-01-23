export type Mapping<T> = {
    table: string;
    mapping: { [key in keyof T]: string; };
};