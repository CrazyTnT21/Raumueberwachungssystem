import {Room} from "../../classes/room";
import {LazyPromise} from "../../lazy";

export interface RoomService
{
    getItem(id: number): Promise<Room>;

    getItems(search: string, page: number, limit: number): Promise<{ total: number, items: Room[] }>;

    createItem(item: Room): Promise<LazyPromise<Room>>
}