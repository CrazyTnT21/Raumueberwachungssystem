import {Room} from "../../classes/room";
import {Lazy, LazyPromise} from "../../lazy";


export interface RoomRepository
{
    getItem(id: number): Promise<Room>;

    getItems(search: string, page: number, limit: number): Promise<{ total: number, items: Room[] }>;

    createItem(item: Room): Promise<LazyPromise<Room>>
}